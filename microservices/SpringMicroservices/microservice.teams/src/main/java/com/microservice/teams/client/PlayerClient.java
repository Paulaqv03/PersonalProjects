package com.microservice.teams.client;

import com.microservice.teams.entities.dto.PlayerDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "msvc-player", url = "localhost:8090")
public interface PlayerClient {
    @GetMapping("/api/player/search-by-team/{idTeam}")
    List<PlayerDTO> finAllPlayersByTeam(@PathVariable Long idTeam);
}
