package com.redlack.redlack.services;

import com.redlack.redlack.dto.ColaboradorDTO;
import com.redlack.redlack.dto.UsuarioDTO;
import com.redlack.redlack.exceptions.EntidadeNaoEncontrada;
import com.redlack.redlack.model.entities.Colaborador;
import com.redlack.redlack.model.entities.Equipe;
import com.redlack.redlack.model.entities.Usuario;
import com.redlack.redlack.repositories.ColaboradorRepository;
import com.redlack.redlack.repositories.UsuarioRepository;
import com.redlack.redlack.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ColaboradorService {

    @Autowired
    private ColaboradorRepository colaboradorRepository;

    public Colaborador getById(long id) {
        return colaboradorRepository.findById(id).orElseThrow(() -> new EntidadeNaoEncontrada(Colaborador.class,id));
    }
    
    @Transactional(readOnly = true)
    public List<ColaboradorDTO> findAll(){
        List<Colaborador> result = colaboradorRepository.findAll();
        List<ColaboradorDTO> dto = result.stream()
                .map(Colaborador::converterParaColaboradorDto)
                .collect(Collectors.toList());
        return dto;
    }

    @Transactional(readOnly = true)
    public ColaboradorDTO findById(@PathVariable Long id){
        Optional<Colaborador> result = colaboradorRepository.findById(id);
        return Colaborador.converterParaColaboradorDto(result.orElseThrow(() -> new ResourceNotFoundException(id)));
    }

    @Transactional(readOnly = true)
    public ColaboradorDTO findByNome(@PathVariable String nome){
        Optional<Colaborador> result = colaboradorRepository.findByNome(nome);
        return Colaborador.converterParaColaboradorDto(result.orElseThrow(() -> new ResourceNotFoundException(nome)));
    }

    @Transactional(readOnly = true)
    public ColaboradorDTO findByEmail(@PathVariable String email){
        Optional<Colaborador> result = colaboradorRepository.findByEmail(email);
        return Colaborador.converterParaColaboradorDto(result.orElseThrow(() -> new ResourceNotFoundException(email)));
    }

    @Transactional
    public ColaboradorDTO insert(@RequestBody Colaborador colab){

        Optional<Colaborador> nome = colaboradorRepository.findByNome(colab.getNome());
        Optional<Colaborador> email = colaboradorRepository.findByEmail(colab.getEmail());
        ColaboradorDTO dto;

        if(nome.isEmpty() && email.isEmpty()) {
            dto = Colaborador.converterParaColaboradorDto(colaboradorRepository.save(colab));
            return dto;

        }else {
            throw new IllegalArgumentException("Argumento inválido");
        }
    }

    @Transactional
    public void deleteById(@PathVariable Long id){
        colaboradorRepository.deleteById(id);
    }

    @Transactional
    public void update(@RequestBody Long id, ColaboradorDTO dto) throws NullPointerException{
        if (!dto.getNome().isBlank() && !dto.getEmail().isBlank()) {
            colaboradorRepository.findById(id)
                    .map(ColaboradorAntigo -> {
                        ColaboradorAntigo.setNome(dto.getNome());
                        ColaboradorAntigo.setEmail(dto.getEmail());
                        ColaboradorAntigo.setCargo(dto.getCargo());
                        ColaboradorAntigo.setDataNascimento(dto.getDataNascimento());
                        Colaborador ColaboradorNovo = colaboradorRepository.save(ColaboradorAntigo);
                        ColaboradorDTO dtoNovo = Colaborador.converterParaColaboradorDto(ColaboradorNovo);


                        return dtoNovo;
                    });
        }else {
            throw new NullPointerException("Campos Inválidos");
        }

    }



}
