package com.redlack.redlack.controllers;

import com.redlack.redlack.dto.ColaboradorDTO;
import com.redlack.redlack.dto.UsuarioDTO;
import com.redlack.redlack.model.entities.Colaborador;
import com.redlack.redlack.services.ColaboradorService;
import com.redlack.redlack.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/colaboradores")
public class ColaboradorController {

    @Autowired
    private ColaboradorService service;

    @GetMapping
    public ResponseEntity<List<ColaboradorDTO>> findAll() {
        List<ColaboradorDTO> result = service.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<ColaboradorDTO> findById(@PathVariable Long id) {
        ColaboradorDTO result = service.findById(id);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping(value = "/nome/{nome}")
    public ResponseEntity<ColaboradorDTO> findByNome(@PathVariable String nome) {
        ColaboradorDTO result = service.findByNome(nome);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping(value = "/email/{email}")
    public ResponseEntity<ColaboradorDTO> findByEmail(@PathVariable String email) {
        ColaboradorDTO result = service.findByEmail(email);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping
    public ColaboradorDTO insert( @RequestBody Colaborador colab) {
        ColaboradorDTO result = service.insert(colab);
        return result;
    }

    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(value = "/{id}")
    public void update(@PathVariable Long id,@Valid @RequestBody ColaboradorDTO dto)
    {
        try {
            service.update(id, dto);
        }catch (NullPointerException e){
            System.out.println(e.getMessage());
            e.getStackTrace();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
}
