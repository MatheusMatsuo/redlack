const request = require("request");
//  const USUARIOS = require('./usuarios');
require("dotenv").config();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

let SLACK_TOKEN = process.env.SLACK_TOKEN;
let REDMINE_TOKEN = process.env.REDMINE_TOKEN;

let USUARIOS_URL = "http://localhost:8888/colaboradores";
let REDMINE_URL =
  "https://novoredmine.xbrain.com.br/redmine/projects/all/issues.json?utf8=%E2%9C%93&set_filter=1&f%5B%5D=status_id&op%5Bstatus_id%5D=o&f%5B%5D=due_date&op%5Bdue_date%5D=%3C%3D&v%5Bdue_date%5D%5B%5D=<data-final>&f%5B%5D=&c%5B%5D=assigned_to&c%5B%5D=subject&c%5B%5D=project&c%5B%5D=priority&c%5B%5D=status&c%5B%5D=tracker&c%5B%5D=start_date&c%5B%5D=due_date&c%5B%5D=done_ratio&c%5B%5D=fixed_version&c%5B%5D=created_on&c%5B%5D=estimated_hours&c%5B%5D=spent_hours&group_by=";
let REDMINE_TASK_URL =
  "https://novoredmine.xbrain.com.br/redmine/issues/<task-id>";
let SLACK_URL =
  "https://slack.com/api/chat.postMessage?channel=<channel>&pretty=1&text=<text>";
let SLACK_URL_OPEN_IM =
  "https://slack.com/api/conversations.open?users=<user>&pretty=1";
let MENSAGEM_USUARIO =
  "Olá! Poderia atualizar a data de finalização da tarefa: https://novoredmine.xbrain.com.br/redmine/issues/<task-id> ? Obrigado!";
let MENSAGEM_CHANNEL =
  "Tarefas a serem atualizadas: (usuários notificados!)\n <tasks>";
const SLACK_CHANNELS = ["C045RQABNE8"];
let USUARIOS = {}

request(USUARIOS_URL, function(error, response, body)
{
  if(!error && response.statusCode== 200){
    USUARIOS= JSON.parse(body)
    console.log("ok");
  }
});


function cbRedmineSearch(error, response, body) {
  if (!error && response.statusCode == 200) {
    const issues = JSON.parse(body).issues;
    issues.forEach((issue) => notificarUsuario(issue));

    notificarChannel(issues);
  } else {
    console.log(error, response);
  }
}

function notificarUsuario(issue) {
  if (!issue.assigned_to) {
    return;
  }
    let msg = MENSAGEM_USUARIO.replace("<task-id>", issue.id);

    msg = encodeURIComponent(msg);

    let usuario = USUARIOS.find(
      (usuario) => usuario.redmine_user_id === issue.assigned_to.id
    );



    if (usuario) {
      request(
        criarUrlOpenImSlack(usuario.slack_id),
        aux,
        function (error, res, body) {
          if (!error && res.statusCode == 200) {
            console.log(JSON.parse(body));
            request(criarUrlSlack(JSON.parse(body).channel.id, msg), aux);
          }
        }
      );
    }
}

//Notifica canal redlack2
function notificarChannel(issues) {
  let msg = issues.reduce((acc, issue) => {
    if (issue.assigned_to) {
      let urlRedmine = REDMINE_TASK_URL.replace("<task-id>", issue.id);
      return (
        acc +
        issue.assigned_to.name +
        " - " +
        issue.due_date +
        " : " +
        urlRedmine +
        "\n"
      );
    }
    return acc;
  }, "");

  msg = MENSAGEM_CHANNEL.replace("<tasks>", msg);
  msg = encodeURIComponent(msg);

  SLACK_CHANNELS.forEach((channel) => {
    request(criarUrlSlack(channel, msg), aux);
  });
}

//Notificar canal com uma mensagem
function criarUrlSlack(channel, msg) {
  return SLACK_URL.replace("<channel>", channel).replace("<text>", msg);
}

function criarUrlOpenImSlack(user) {
  return SLACK_URL_OPEN_IM.replace("<user>", user);
}

//Cria url para retornar as tasks com data atrasada
function criarUrlRedmineSearch() {
  let date = new Date();
  date = date.toJSON().substring(0, 10);
  return REDMINE_URL.replace("<data-final>", date);
}

const options = {
  url: criarUrlRedmineSearch(),
  headers: {
    "X-Redmine-API-Key": REDMINE_TOKEN,
  },
};

const aux = {
  headers: {
    Authorization: "Bearer " + SLACK_TOKEN,
  },
};

console.log("Inicio");

try {
  request(options, cbRedmineSearch);
} catch (error) {
  console.log(error);
}

console.log("Fim");
