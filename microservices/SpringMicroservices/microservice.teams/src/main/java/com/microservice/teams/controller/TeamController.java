package com.microservice.teams.controller;

import com.microservice.teams.entities.Team;
import com.microservice.teams.service.ITeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/team")
public class TeamController {
    @Autowired
    private ITeamService teamService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody Team team){
        teamService.save(team);
    }

    @GetMapping("/all")
    public ResponseEntity<?> findAllTeam(){
        return ResponseEntity.ok(teamService.findAll());
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        return ResponseEntity.ok(teamService.findById(id));
    }

    @GetMapping("/search-player/{idTeam}")
    public ResponseEntity<?> findPlayersByIdTeam(@PathVariable Long idTeam){
        return ResponseEntity.ok(teamService.findPlayersByIdTeam(idTeam));
    }
}
