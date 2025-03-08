package com.microservice.teams.service;

import com.microservice.teams.client.PlayerClient;
import com.microservice.teams.entities.Team;
import com.microservice.teams.entities.dto.PlayerDTO;
import com.microservice.teams.http.response.PlayerByTeamResponse;
import com.microservice.teams.persistence.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamServiceImpl implements ITeamService{
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private PlayerClient playerClient;

    @Override
    public List<Team> findAll() {
        return (List<Team>) teamRepository.findAll();
    }

    @Override
    public Team findById(long id) {
        return teamRepository.findById(id).orElseThrow();
    }

    @Override
    public void save(Team team) {

    }

    @Override
    public PlayerByTeamResponse findPlayersByIdTeam(Long idTeam) {
        //consultar el equipo
        Team team = teamRepository.findById(idTeam).orElse(new Team());
        //consultar los jugadores
        List<PlayerDTO> playerDTOList = playerClient.finAllPlayersByTeam(idTeam);
        return PlayerByTeamResponse.builder()
                .nameTeam(team.getName())
                .coach(team.getCoach())
                .playerDTOS(playerDTOList)
                .build();
    }
}
