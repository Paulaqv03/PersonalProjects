package com.microservice.players.service;

import com.microservice.players.entities.Player;
import com.microservice.players.persistence.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerServiceImpl implements IPlayerService{
    @Autowired
    private PlayerRepository playerRepository;

    @Override
    public List<Player> findAll() {
        return (List<Player>) playerRepository.findAll();
    }

    @Override
    public Player findById(Long id) {
        return playerRepository.findById(id).orElseThrow();
    }

    @Override
    public void save(Player player) {
        playerRepository.save(player);
    }

    @Override
    public List<Player> findByIdPlayer(Long idTeam) {
        return playerRepository.findAllByTeamId(idTeam);
    }
}
