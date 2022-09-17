package com.redlack.redlack.repositories;

import com.redlack.redlack.model.entities.Colaborador;
import com.redlack.redlack.model.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {

    Optional<Colaborador> findByNome(String nome);

    Optional<Colaborador> findByEmail(String email);
}
