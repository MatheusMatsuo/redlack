package com.redlack.redlack.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.redlack.redlack.dto.ColaboradorDTO;
import com.redlack.redlack.dto.EquipeDTO;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "tb_equipe")
public class Equipe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_equipe")
    private Long id;
    @Column(name = "nome", nullable = false)
    private String nome;
    private Integer enumTipoEquipe;

    @OneToMany(mappedBy = "equipe", cascade = CascadeType.ALL)
    private Set<Colaborador> colaboradores = new HashSet<>();

    public Equipe(Long id, String nome, EnumTipoEquipe enumTipoEquipe){
        this.id = id;
        this.nome = nome;
        setEnumTipoEquipe(enumTipoEquipe);
    }

    public EnumTipoEquipe getEnumTipoEquipe(){
        return EnumTipoEquipe.valueOf(enumTipoEquipe);
    }

    public void setEnumTipoEquipe(EnumTipoEquipe enumTipoEquipe){
        if(enumTipoEquipe != null){
            this.enumTipoEquipe = enumTipoEquipe.getCode();
        }
    }


    public Equipe(EquipeDTO dto) {
        this.id = dto.getId();
        this.nome = dto.getNome();
        setEnumTipoEquipe(dto.getEnumTipoEquipe());
//        dto.getColaboradores().stream()
//                .forEach(a -> colaboradores.add(a));
    }

    // colocar no service
    public static EquipeDTO converterParaEquipeDto(Equipe equipe){
        EquipeDTO dto = new EquipeDTO();
        dto.setId(equipe.getId());
        dto.setNome(equipe.getNome());
        dto.setEnumTipoEquipe(dto.getEnumTipoEquipe());
        //dto.setColaboradores(equipe.getColaboradores());
        return dto;
    }
    @JsonIgnore
    public Set<Colaborador> getColaboradores() {
        return colaboradores;
    }
}
