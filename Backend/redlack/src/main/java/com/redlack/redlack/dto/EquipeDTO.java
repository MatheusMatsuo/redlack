package com.redlack.redlack.dto;

import com.redlack.redlack.model.entities.Colaborador;
import com.redlack.redlack.model.entities.EnumTipoEquipe;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class EquipeDTO {

    private Long id;

    @NotNull
    @NotBlank
    private String nome;
    private EnumTipoEquipe enumTipoEquipe;

    private List<Long> collectionColaborador;

    public EnumTipoEquipe getEnumTipoEquipe(){
        return enumTipoEquipe;
    }


}
