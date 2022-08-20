package com.redlack.redlack.repositories;

import com.redlack.redlack.model.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Usuario findByNome(String nome);

    Usuario findByEmail(String email);
}
