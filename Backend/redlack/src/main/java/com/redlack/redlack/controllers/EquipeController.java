package com.redlack.redlack.controllers;

import com.redlack.redlack.dto.EquipeDTO;
import com.redlack.redlack.dto.UsuarioDTO;
import com.redlack.redlack.model.entities.Equipe;
import com.redlack.redlack.services.EquipeService;
import com.redlack.redlack.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/equipes")
public class EquipeController {

    @Autowired
    private EquipeService service;

    @GetMapping
    public List<EquipeDTO> findAll() {
        List<EquipeDTO> result = service.findAll();
        return result;
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Equipe> findById(@PathVariable Long id) {
        Equipe result = service.findById(id);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping(value = "/nome/{nome}")
    public ResponseEntity<Equipe> findByNome(@PathVariable String nome) {
        Equipe result = service.findByNome(nome);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping
    public EquipeDTO insert(@Valid @RequestBody EquipeDTO dto) {
        EquipeDTO result = service.insert(dto);
        return result;
    }

    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(value = "/{id}")
    public void update(@PathVariable Long id,@Valid @RequestBody EquipeDTO dto)
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
