package com.microservice.teams.service;

import com.microservice.teams.entities.Team;
import com.microservice.teams.http.response.PlayerByTeamResponse;

import java.util.List;

public interface ITeamService {
    List<Team> findAll();
    Team findById(long id);
    void save(Team team);
    PlayerByTeamResponse findPlayersByIdTeam(Long idTeam);
}
