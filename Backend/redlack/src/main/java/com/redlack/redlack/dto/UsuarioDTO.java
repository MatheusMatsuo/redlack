package com.redlack.redlack.dto;

import com.redlack.redlack.entities.Usuario;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

public class UsuarioDTO implements Serializable {

    private static final long serialVerisonUID= 1L;

    private Long id;
    private String nome;
    private String email;
    private String senha;

    public UsuarioDTO(){}

    public UsuarioDTO(String nome, String email, String senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    public UsuarioDTO(Usuario usuario){
        this.id = usuario.getId();;
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        this.senha = usuario.getSenha();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    @Override
    public String toString() {
        return "UsuarioDTO{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", senha='" + senha + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsuarioDTO usuarioDTO = (UsuarioDTO) o;
        return Objects.equals(id, usuarioDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
