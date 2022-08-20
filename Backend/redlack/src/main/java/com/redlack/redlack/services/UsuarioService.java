package com.redlack.redlack.services;

import com.redlack.redlack.dto.UsuarioDTO;
import com.redlack.redlack.model.entities.Usuario;
import com.redlack.redlack.repositories.UsuarioRepository;
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
        List<UsuarioDTO> dto = result.stream().map(x -> new UsuarioDTO()).collect(Collectors.toList());
        return dto;
    }

    @Transactional(readOnly = true)
    public UsuarioDTO findById(@PathVariable Long id){
        Usuario result = repository.findById(id).get();
        UsuarioDTO dto = new UsuarioDTO();
        return dto;
    }

    @Transactional(readOnly = true)
    public UsuarioDTO findByNome(@PathVariable String nome){
        Usuario result = repository.findByNome(nome);
        UsuarioDTO dto = new UsuarioDTO();
        return dto;
    }

    @Transactional(readOnly = true)
    public UsuarioDTO findByEmail(@PathVariable String email){
        Usuario result = repository.findByEmail(email);
        UsuarioDTO dto = new UsuarioDTO();
        return dto;
    }

    @Transactional
    public UsuarioDTO insert(@RequestBody UsuarioDTO dto){

        Usuario nome = repository.findByNome(dto.getNome());
        Usuario email = repository.findByEmail(dto.getEmail());
        UsuarioDTO resultadoDTO = null;

        if(nome == null && email == null) {
            Usuario resultado = new Usuario(dto);
            resultado = repository.save(resultado);
            resultadoDTO = new UsuarioDTO();

        }return resultadoDTO;
    }

    @Transactional
    public void deleteById(@PathVariable Long id){
        repository.deleteById(id);
    }

    @Transactional
    public void update(@RequestBody Long id, UsuarioDTO dto){
       repository.findById(id)
                .map(usuarioAntigo -> {
                    usuarioAntigo.setNome(dto.getNome());
                    usuarioAntigo.setEmail(dto.getEmail());
                    usuarioAntigo.setSenha(dto.getSenha());
                    Usuario usuarioNovo = repository.save(usuarioAntigo);
                    UsuarioDTO dtoNovo = new UsuarioDTO();
                    return dtoNovo;
                        });

    }



    @Transactional(rollbackFor = Exception.class)
    public String saveDto(UsuarioDTO usuarioDTO){
        usuarioDTO.setSenha(bCryptPasswordEncoder
                .encode(usuarioDTO.getSenha()));
        Long aux = repository.save(new Usuario(usuarioDTO)).getId();
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }


}
