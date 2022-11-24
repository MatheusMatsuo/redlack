const request = require("request");
const cron = require("node-cron");
require("dotenv").config();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

let SLACK_TOKEN = process.env.SLACK_TOKEN;
let REDMINE_TOKEN = process.env.REDMINE_TOKEN;

let USUARIOS_URL = "http://localhost:8888/colaboradores";
let EQUIPES_URL = "http://localhost:8888/equipes";
let REDMINE_URL =
  "https://novoredmine.xbrain.com.br/redmine/projects/all/issues.json?utf8=%E2%9C%93&set_filter=1&f%5B%5D=status_id&op%5Bstatus_id%5D=o&f%5B%5D=due_date&op%5Bdue_date%5D=%3C%3D&v%5Bdue_date%5D%5B%5D=<data-final>&f%5B%5D=&c%5B%5D=assigned_to&c%5B%5D=subject&c%5B%5D=project&c%5B%5D=priority&c%5B%5D=status&c%5B%5D=tracker&c%5B%5D=start_date&c%5B%5D=due_date&c%5B%5D=done_ratio&c%5B%5D=fixed_version&c%5B%5D=created_on&c%5B%5D=estimated_hours&c%5B%5D=spent_hours&group_by=";
let REDMINE_URL_FINALIZADAS =
  "https://novoredmine.xbrain.com.br/redmine/projects/all/issues.json?utf8=%E2%9C%93&set_filter=1&f%5B%5D=status_id&op%5Bstatus_id%5D=%3D&v%5Bstatus_id%5D%5B%5D=5&f%5B%5D=closed_on&op%5Bclosed_on%5D=ld&f%5B%5D=&c%5B%5D=project&c%5B%5D=assigned_to&c%5B%5D=subject&c%5B%5D=priority&c%5B%5D=status&c%5B%5D=tracker&c%5B%5D=start_date&c%5B%5D=due_date&c%5B%5D=done_ratio&c%5B%5D=fixed_version&c%5B%5D=created_on&c%5B%5D=estimated_hours&c%5B%5D=spent_hours&group_by=";
let REDMINE_URL_FINALIZADAS_SEXTA =
  "https://novoredmine.xbrain.com.br/redmine/projects/all/issues.json?utf8=%E2%9C%93&set_filter=1&f%5B%5D=status_id&op%5Bstatus_id%5D=%3D&v%5Bstatus_id%5D%5B%5D=5&f%5B%5D=closed_on&op%5Bclosed_on%5D=t-&v%5Bclosed_on%5D%5B%5D=3&f%5B%5D=&c%5B%5D=project&c%5B%5D=assigned_to&c%5B%5D=subject&c%5B%5D=priority&c%5B%5D=status&c%5B%5D=tracker&c%5B%5D=start_date&c%5B%5D=due_date&c%5B%5D=done_ratio&c%5B%5D=fixed_version&c%5B%5D=created_on&c%5B%5D=estimated_hours&c%5B%5D=spent_hours&group_by=;";
let TASK_URL = "https://novoredmine.xbrain.com.br/redmine/issues/<task-id>";
let SLACK_URL =
  "https://slack.com/api/chat.postMessage?channel=<channel>&pretty=1&text=<text>";
let SLACK_URL_OPEN_IM =
  "https://slack.com/api/conversations.open?users=<user>&pretty=1";
let MENSAGEM_USUARIO =
  "Olá! Poderia atualizar a data de finalização da tarefa: https://novoredmine.xbrain.com.br/redmine/issues/<task-id> ? Obrigado!";
let MENSAGEM_CHANNEL_ATRASADA =
  "Tarefas a serem atualizadas: (usuários notificados!)\n <tasks>";
let MENSAGEM_CHANNEL_FINALIZADAS =
  "Tarefas que foram finalizadas no dia anterior: (usuários notificados!)\n <tasks>";
let MENSAGEM_CHANNEL_ANIVERSARIO =
  "Aniversariantes do dia: \n <aniversariante>";
const SLACK_CHANNELS = ["C045RQABNE8"];
const SLACK_CHANNELS_FINALIZADA = ["C0463CLJ4LW"];
const SLACK_CHANNELS_ANIVERSARIANTES = "C046NBKL0MR";

function cbRedmineSearch(error, response, body) {
  if (!error && response.statusCode === 200) {
    const issues = JSON.parse(body).issues;
    issues.forEach((issue) => notificarUsuario(issue));

    notificarChannel(issues);
  } else {
    console.log(error, response);
  }
}

function cbRedmineSearchFinalizadas(error, response, body) {
  if (!error && response.statusCode === 200) {
    const issues = JSON.parse(body).issues;

    notificarChannelFinalizada(issues);
  } else {
    console.log(error, response);
  }
}

async function notificarUsuario(issue) {
  if (!issue.assigned_to) {
    return;
  }
  let msg = MENSAGEM_USUARIO.replace("<task-id>", issue.id);

  msg = encodeURIComponent(msg);

  await request(USUARIOS_URL, (error, response) => {
    JSON.parse(response.body).forEach((colab) => {
      if (colab.redmine_user_id === issue.assigned_to.id) {
        request(
          criarUrlOpenImSlack(colab.slack_id),
          aux,
          async function (error, res, body) {
            if (!error && res.statusCode === 200) {
              await request(
                criarUrlSlack(JSON.parse(body).channel.id, msg),
                aux
              );
            }
          }
        );
      }
    });
  });
}

//Notifica canal redlack2
function notificarChannel(issues) {
  let msg = issues.reduce((acc, issue) => {
    if (issue.assigned_to) {
      let urlRedmine = TASK_URL.replace("<task-id>", issue.id);
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

  msg = MENSAGEM_CHANNEL_ATRASADA.replace("<tasks>", msg);
  msg = encodeURIComponent(msg);

  SLACK_CHANNELS.forEach((channel) => {
    request(criarUrlSlack(channel, msg), aux);
  });
}

function notificarChannelFinalizada(issues) {
  request(EQUIPES_URL, (error, response) => {
    let equipes = JSON.parse(response.body);
    request(USUARIOS_URL, (error, response) => {
      let colabs = JSON.parse(response.body);

      equipes.forEach((equipe) => {
        let msg = "";
        colabs.forEach((colab) => {
          msg += issues.reduce((acc, issue) => {
            if (
              issue.assigned_to &&
              colab.redmine_user_id === issue.assigned_to.id &&
              colab.equipe.id === equipe.id
            ) {
              let urlRedmine = TASK_URL.replace("<task-id>", issue.id);
              return (
                acc +
                issue.assigned_to.name +
                " - " +
                issue.closed_on +
                " : " +
                urlRedmine +
                "\n"
              );
            }
            return acc;
          }, "");
        });
        msg = MENSAGEM_CHANNEL_FINALIZADAS.replace("<tasks>", msg);
        msg = encodeURIComponent(msg);

        request(criarUrlSlack(equipe.canal_id, msg), aux);
      });
    });
  });
}

function notificarChannelAniversariante() {
  request(USUARIOS_URL, (error, response) => {
    let date = new Date();
    date = date.toJSON().substring(5, 10);
    let msg = "";

    JSON.parse(response.body).forEach((colab) => {
      let dataNascimentoColab = colab.dataNascimento.substring(5, 10);
      
      console.log(dataNascimentoColab);
      if (dataNascimentoColab === date) {
        msg += "- " + colab.nome + "\n";
      }
    });

    msg = MENSAGEM_CHANNEL_ANIVERSARIO.replace("<aniversariante>", msg);

    request(criarUrlSlack(SLACK_CHANNELS_ANIVERSARIANTES, msg), aux);
  });
}

// //Notificar canal com uma mensagem
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

const optionsAtrasadas = {
  url: criarUrlRedmineSearch(),
  headers: {
    "X-Redmine-API-Key": REDMINE_TOKEN,
  },
};

const optionsFinalizadas = {
  url: REDMINE_URL_FINALIZADAS,
  headers: {
    "X-Redmine-API-Key": REDMINE_TOKEN,
  },
};

const optionsFinalizadasSexta = {
  url: REDMINE_URL_FINALIZADAS_SEXTA,
  headers: {
    "X-Redmine-API-Key": REDMINE_TOKEN,
  },
};

const aux = {
  headers: {
    Authorization: "Bearer " + SLACK_TOKEN,
  },
};

try {
  // cron.schedule("20 58 * * * *", function () {
  //   console.log("Inicio");
  //   request(optionsAtrasadas, cbRedmineSearch);
  //   request(optionsFinalizadas, cbRedmineSearchFinalizadas);
  //   notificarChannelAniversariante();
  //   console.log("Fim");
  // });

  request(optionsAtrasadas, cbRedmineSearch);
  request(optionsFinalizadas, cbRedmineSearchFinalizadas);
  notificarChannelAniversariante();

  cron.schedule("00 40 * * * 0", function () {
    console.log("teste");
    // request(optionsAtrasadas, cbRedmineSearch);
    // request(optionsFinalizadas, cbRedmineSearchFinalizadas);
    // request(optionsFinalizadasSexta, cbRedmineSearchFinalizadas);
    // notificarChannelAniversariante();
  });
} catch (error) {
  console.log(error);
}