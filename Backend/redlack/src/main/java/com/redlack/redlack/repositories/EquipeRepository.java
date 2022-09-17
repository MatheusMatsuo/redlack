package com.redlack.redlack.repositories;

import com.redlack.redlack.model.entities.Equipe;
import com.redlack.redlack.model.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EquipeRepository extends JpaRepository<Equipe, Long> {

    Optional<Equipe> findByNome(String nome);

}
