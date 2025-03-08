package com.microservice.players.controller;

import com.microservice.players.entities.Player;
import com.microservice.players.service.IPlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/player")
public class PlayerController {

    @Autowired
    private IPlayerService playerService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void savePlayer(@RequestBody Player player){
        playerService.save(player);
    }

    @GetMapping("/all")
    public ResponseEntity<?> findAllPlayer(){
        return ResponseEntity.ok(playerService.findAll());
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        return ResponseEntity.ok(playerService.findById(id));
    }

    @GetMapping("/search-by-team/{idTeam}")
    public ResponseEntity<?> findByIdTeam(@PathVariable Long idTeam){
        return ResponseEntity.ok(playerService.findByIdPlayer(idTeam));
    }
}
