package com.redlack.redlack.controllers;

import com.redlack.redlack.dto.UsuarioDTO;
import com.redlack.redlack.entities.Usuario;
import com.redlack.redlack.repositories.UsuarioRepository;
import com.redlack.redlack.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> findAll(){
        List<UsuarioDTO> result = service.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UsuarioDTO> findById(@PathVariable Long id){
        UsuarioDTO result = service.findById(id);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping(value = "/nome/{nome}")
    public ResponseEntity<UsuarioDTO> findByNome(@PathVariable String nome){
        UsuarioDTO result = service.findByNome(nome);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping(value = "/email/{email}")
    public ResponseEntity<UsuarioDTO> findByEmail(@PathVariable String email){
        UsuarioDTO result = service.findByEmail(email);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping
    public UsuarioDTO insert(@RequestBody UsuarioDTO dto) {
        UsuarioDTO result = service.insert(dto);
        return result;
    }

    @DeleteMapping(value = "/deletar/{id}")
    public void delete(@PathVariable Long id){
         service.deleteById(id);
    }

    @PutMapping(value = "/{id}")
    public void update(@PathVariable Long id, @RequestBody UsuarioDTO dto){
        service.update(id, dto);
    }
        }
   