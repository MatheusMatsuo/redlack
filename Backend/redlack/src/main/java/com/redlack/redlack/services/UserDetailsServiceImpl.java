package com.redlack.redlack.services;

import com.redlack.redlack.model.entities.Usuario;
import com.redlack.redlack.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UserDetailsServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public UserDetails loadUserByUsername(String nome) throws UsernameNotFoundException {
        final Usuario usuario = usuarioRepository.findByNome(nome);

        if (usuario == null) {
            throw new UsernameNotFoundException(nome);
        }

        UserDetails userDetails = org.springframework.security.core.userdetails.User.withUsername(
                usuario.getNome()).password(usuario.getSenha()).roles("USER").build();

        return userDetails;
    }
}