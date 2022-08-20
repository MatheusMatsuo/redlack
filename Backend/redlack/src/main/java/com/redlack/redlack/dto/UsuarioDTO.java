package com.redlack.redlack.dto;

import com.redlack.redlack.model.entities.Usuario;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;


@Getter
@Setter
public class UsuarioDTO{

    private Long id;
    private String nome;

    private String email;

    private String senha;



}
