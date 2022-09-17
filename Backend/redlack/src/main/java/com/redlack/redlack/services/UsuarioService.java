package com.redlack.redlack.services;

import com.redlack.redlack.dto.UsuarioDTO;
import com.redlack.redlack.model.entities.Usuario;
import com.redlack.redlack.repositories.UsuarioRepository;
import com.redlack.redlack.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
/*import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
 */
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional(readOnly = true)
    public List<UsuarioDTO> findAll(){
        List<Usuario> result = repository.findAll();
        List<UsuarioDTO> dto = result.stream()
                .map(Usuario::converterParaUsuarioDto)
                .collect(Collectors.toList());
        return dto;
    }

    @Transactional(readOnly = true)
    public UsuarioDTO findById(@PathVariable Long id){
            Optional<Usuario> result = repository.findById(id);
            return Usuario.converterParaUsuarioDto(result.orElseThrow(() -> new ResourceNotFoundException(id)));
    }

    @Transactional(readOnly = true)
    public UsuarioDTO findByNome(@PathVariable String nome){
        Optional<Usuario> result = repository.findByNome(nome);
        return Usuario.converterParaUsuarioDto(result.orElseThrow(() -> new ResourceNotFoundException(nome)));
    }

    @Transactional(readOnly = true)
    public UsuarioDTO findByEmail(@PathVariable String email){
        Optional<Usuario> result = repository.findByEmail(email);
        return Usuario.converterParaUsuarioDto(result.orElseThrow(() -> new ResourceNotFoundException(email)));
    }

    @Transactional
    public UsuarioDTO insert(@RequestBody UsuarioDTO dto){

        Optional<Usuario> nome = repository.findByNome(dto.getNome());
        Optional<Usuario> email = repository.findByEmail(dto.getEmail());
        UsuarioDTO resultadoDTO = null;

        if(nome.isEmpty() && email.isEmpty()) {
            Usuario resultado = new Usuario(dto);
            resultado = repository.save(resultado);
            resultadoDTO = new UsuarioDTO();
            return resultadoDTO;

        }else {
            throw new IllegalArgumentException("Argumento inválido");
        }
    }

    @Transactional
    public void deleteById(@PathVariable Long id){
        repository.deleteById(id);
    }

    @Transactional
    public void update(@RequestBody Long id, UsuarioDTO dto) throws NullPointerException{
        if (!dto.getNome().isBlank() && !dto.getEmail().isBlank() && !dto.getSenha().isBlank()) {
            repository.findById(id)
                    .map(usuarioAntigo -> {
                        usuarioAntigo.setNome(dto.getNome());
                        usuarioAntigo.setEmail(dto.getEmail());
                        usuarioAntigo.setSenha(dto.getSenha());
                        Usuario usuarioNovo = repository.save(usuarioAntigo);
                        UsuarioDTO dtoNovo = Usuario.converterParaUsuarioDto(usuarioNovo);


                        return dtoNovo;
                    });
        }else {
            throw new NullPointerException("Campos Inválidos");
        }

    }



    @Transactional(rollbackFor = Exception.class)
    public String saveDto(@RequestBody UsuarioDTO usuarioDTO){
        usuarioDTO.setSenha(bCryptPasswordEncoder
                .encode(usuarioDTO.getSenha()));
        Long aux = repository.save(new Usuario(usuarioDTO)).getId();
        return aux.toString();
    }


}
