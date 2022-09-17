package com.redlack.redlack.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.redlack.redlack.model.entities.Equipe;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.Nullable;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
public class ColaboradorDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;
    private String nome;
    private String email;
    private String cargo;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataNascimento;

    @Nullable
    private Equipe equipe;

}
