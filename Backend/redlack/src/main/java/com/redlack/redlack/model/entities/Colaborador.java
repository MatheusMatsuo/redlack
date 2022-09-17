package com.redlack.redlack.model.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.redlack.redlack.dto.ColaboradorDTO;
import com.redlack.redlack.dto.UsuarioDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_colaborador")
@Entity
public class Colaborador implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_colaborador")
    private Long id;
    @Column(name = "nome", nullable = false)
    private String nome;
    private String email;
    private String cargo;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataNascimento;

    @ManyToOne
    @JoinColumn(name = "id_equipe")
    private Equipe equipe;



    public Colaborador(ColaboradorDTO dto) {
        this.id = dto.getId();
        this.nome = dto.getNome();
        this.email = dto.getEmail();
        this.cargo = dto.getCargo();
        this.dataNascimento = dto.getDataNascimento();
        this.equipe = dto.getEquipe();
    }

    public static ColaboradorDTO converterParaColaboradorDto(Colaborador colaborador){
        ColaboradorDTO dto = new ColaboradorDTO();
        dto.setId(colaborador.getId());
        dto.setNome(colaborador.getNome());
        dto.setEmail(colaborador.getEmail());
        dto.setCargo(colaborador.getCargo());
        dto.setDataNascimento(colaborador.getDataNascimento());
        dto.setEquipe(colaborador.getEquipe());

        return dto;
    }

}
