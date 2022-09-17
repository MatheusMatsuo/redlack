package com.redlack.redlack.services;

import com.redlack.redlack.dto.EquipeDTO;
import com.redlack.redlack.dto.UsuarioDTO;
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

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EquipeService {


    @Autowired
    private EquipeRepository repository;

    @Autowired
    private ColaboradorRepository colaboradorRepository;

    @Autowired
    private ColaboradorService colaboradorService;

    private ModelMapper modelMapper;
//    @Transactional(readOnly = true)
//    public List<EquipeDTO> findAll(){
//        this.modelMapper = new ModelMapper();
//        return repository.findAll()
//                .stream()
//                .map(a -> modelMapper.map(a, EquipeDTO.class))
//                .collect(Collectors.toList());
//    }

    @Transactional(readOnly = true)
    public List<EquipeDTO> findAll(){
        List<Equipe> result = repository.findAll();
        List<EquipeDTO> dto = result.stream()
                .map(Equipe::converterParaEquipeDto)
                .collect(Collectors.toList());
        return dto;
    }

    @Transactional(readOnly = true)
    public Equipe findById(@PathVariable Long id){
        Optional<Equipe> result = repository.findById(id);
        return result.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    @Transactional(readOnly = true)
    public Equipe findByNome(@PathVariable String nome){
        Optional<Equipe> result = repository.findByNome(nome);
        return result.orElseThrow(() -> new ResourceNotFoundException(nome));
    }

    @Transactional
    public EquipeDTO insert(EquipeDTO dto){
        ModelMapper modelMapper = new ModelMapper();

        Optional<Equipe> nome = repository.findByNome(dto.getNome());
        Equipe eq = modelMapper.map(dto, Equipe.class);

        if(nome.isEmpty()) {
            eq = repository.save(eq);
            eq = findByNome(dto.getNome());
            dto = modelMapper.map(eq, EquipeDTO.class);
            return dto;

        }else {
            throw new IllegalArgumentException("Argumento inválido");
        }
    }

    @Transactional
    public void deleteById(@PathVariable Long id){
        repository.deleteById(id);
    }

    @Transactional
    public void update(@RequestBody Long id, EquipeDTO dto) throws NullPointerException{
        if (!dto.getNome().isBlank()) {
            repository.findById(id)
                    .map(EquipeAntigo -> {
                        EquipeAntigo.setNome(dto.getNome());
                        EquipeAntigo.setEnumTipoEquipe(dto.getEnumTipoEquipe());
                        Equipe EquipeNovo = repository.save(EquipeAntigo);
                        EquipeDTO dtoNovo = Equipe.converterParaEquipeDto(EquipeNovo);
                        return dtoNovo;
                    });
        }else {
            throw new NullPointerException("Campos Inválidos");
        }

    }
}
