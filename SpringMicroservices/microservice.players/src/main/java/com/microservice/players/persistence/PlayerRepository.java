package com.microservice.players.persistence;

import com.microservice.players.entities.Player;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends CrudRepository<Player, Long> {
    List<Player> findAllByTeamId(Long idTeam);
}
