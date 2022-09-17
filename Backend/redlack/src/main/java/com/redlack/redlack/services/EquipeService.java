package com.redlack.redlack.services;

import com.redlack.redlack.dto.EquipeDTO;
import com.redlack.redlack.dto.UsuarioDTO;
import com.redlack.redlack.exceptions.EntidadeNaoEncontrada;
import com.redlack.redlack.model.entities.Colaborador;
import com.redlack.redlack.model.entities.Equipe;
import com.redlack.redlack.model.entities.Usuario;
import com.redlack.redlack.repositories.ColaboradorRepository;
import com.redlack.redlack.repositories.EquipeRepository;
import com.redlack.redlack.repositories.UsuarioRepository;
import com.redlack.redlack.services.exceptions.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EquipeService {


    // Todo -> sempre utilizar nomes significativos, apesar de termos o contexto de que estamos no service de equipe não custa nada colocar equipeRepository como nome.
    @Autowired
    private EquipeRepository equipeRepository;

    // Todo -> nunca chame outro equipeRepository que não seja a da entidade devida, para utilizar o melhor a se fazer é criar uma função no service do repositorio que vc deseja acessar e a partir do service fazer a chamada aqui.
//    @Autowired
//    private ColaboradorRepository colaboradorRepository;

    @Autowired
    private ColaboradorService colaboradorService;

//    private ModelMapper modelMapper;
//    @Transactional(readOnly = true)
//    public List<EquipeDTO> findAll(){
//        this.modelMapper = new ModelMapper();
//        return equipeRepository.findAll()
//                .stream()
//                .map(a -> modelMapper.map(a, EquipeDTO.class))
//                .collect(Collectors.toList());
//    }

    // aqui eu criei uma classe de exceção para vc, chama EntidadeNaoEncotrada, fiz esse exemplo abaixo para vc saber como usar
    // Basicamente ela manda a excessão mais bonitinha e melhor tratada pro front kkk.
    public Equipe getById(long id) {
        return equipeRepository.findById(id).orElseThrow(() -> new EntidadeNaoEncontrada(Equipe.class,id));
    }

    // Todo -> tenta sempre fazer a função ter unicidade ou seja, fazer uma coisa só, no caso abaixo ela está fazendo uma busca E preenchendo o retorno em um dto
    // Se para explicar a função vc tiver que falar E ou OU significa que ela faz mais de umacoisa já.
//    @Transactional(readOnly = true)
//    public List<EquipeDTO> findAll(){
//        List<Equipe> result = equipeRepository.findAll();
//
//        List<EquipeDTO> dto = result.stream()
//                .map(Equipe::converterParaEquipeDto)
//                .collect(Collectors.toList());
//        return dto;
//    }

    // Todo -> como eu faria a mesma função acima: (apenas um exemplo)
    @Transactional(readOnly = true)
    public List<Equipe> getAll() {
        return equipeRepository.findAll();
    }
    // E qual o motivo de eu fazer assim? bom primeiro que eu tenho a liberdade de utilizar a entidade Equipe internamente quando e onde eu quiser e quando precisar do dto eu chamo a função abaixo, segundo: organização, muito mais facil entender o que está acontecendo assim.
    public List<EquipeDTO> equipeDTOList () {
        ModelMapper modelMapper = new ModelMapper();
        return this.getAll().stream().map(a -> modelMapper.map(a, EquipeDTO.class)).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Equipe findById(@PathVariable Long id){
        Optional<Equipe> result = equipeRepository.findById(id);
        return result.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    @Transactional(readOnly = true)
    public Equipe findByNome(@PathVariable String nome){
        Optional<Equipe> result = equipeRepository.findByNome(nome);
        return result.orElseThrow(() -> new ResourceNotFoundException(nome));
    }

//    @Transactional
//    public EquipeDTO insert(EquipeDTO dto){
//        ModelMapper modelMapper = new ModelMapper();
//
//        Optional<Equipe> nome = equipeRepository.findByNome(dto.getNome());
//        Equipe eq = modelMapper.map(dto, Equipe.class);
//
//        if(nome.isEmpty()) {
//            eq = equipeRepository.save(eq);
//            eq = findByNome(dto.getNome());
//            dto = modelMapper.map(eq, EquipeDTO.class);
//            return dto;
//
//        }else {
//            throw new IllegalArgumentException("Argumento inválido");
//        }
//    }

    @Transactional
    public void deleteById(@PathVariable Long id){
        equipeRepository.deleteById(id);
    }

//    @Transactional
//    public void update(@RequestBody Long id, EquipeDTO dto) throws NullPointerException{
//        if (!dto.getNome().isBlank()) {
//            equipeRepository.findById(id)
//                    .map(EquipeAntigo -> {
//                        EquipeAntigo.setNome(dto.getNome());
//                        EquipeAntigo.setEnumTipoEquipe(dto.getEnumTipoEquipe());
//                        Equipe EquipeNovo = equipeRepository.save(EquipeAntigo);
//                        EquipeDTO dtoNovo = Equipe.converterParaEquipeDto(EquipeNovo);
//                        return dtoNovo;
//                    });
//        }else {
//            throw new NullPointerException("Campos Inválidos");
//        }
//
//    }

    // Todo -> essa seria a forma que eu faria o save:
    public void save (EquipeDTO equipeDto) {
        Equipe equipe;
        // se o id que vem do front for 0 significa que não existe uma equipe ainda, se o id existir significa que a equipe existe.
        // essa função ja garante que vai salvar e editar, não é necessário criar duas finalidades diferentes.
        // Pensa comigo, se você tem o id = 0 é salvar, se vc tem um id existente é editar. as duas fazem exatamente a mesma coisa depois disso.
        if (equipeDto.getId() > 0) {
            equipe = this.getById(equipeDto.getId());
        } else {
            equipe = new Equipe();
        }
        EquipeDTO dto = new EquipeDTO();
        dto.setId(equipe.getId());
        dto.setNome(equipe.getNome());
        dto.setEnumTipoEquipe(dto.getEnumTipoEquipe());
        equipe.setCollectionColaborador(new ArrayList<>());
        equipe.getCollectionColaborador().clear();
        // Abaixo temos um loop para percorrer cada id que veio na lista de colaboradores.
        for (Long colaboradorId : equipeDto.getCollectionColaborador()) {
            // aqui a gente vai carregar o colaborador a partir do id que pegamos da lista.
            Colaborador colaborador = colaboradorService.getById(colaboradorId);
            // a gente precisa setar dentro de colaborador essa equipe na qual estamos atribuindo ele.
            colaborador.setEquipe(equipe);
            // agora vamos adicionar na collection o colaborador (criando assim o vinculo entre os 2)
            equipe.getCollectionColaborador().add(colaborador);
        }
        //dto.setColaboradores(equipe.getColaboradores());
        equipeRepository.save(equipe);
    }
}
