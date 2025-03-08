package com.microservice.players.service;

import com.microservice.players.entities.Player;

import java.util.List;

public interface IPlayerService {
    List<Player> findAll();
    Player findById(Long id);
    void save(Player player);
    List<Player> findByIdPlayer(Long idTeam);
}
