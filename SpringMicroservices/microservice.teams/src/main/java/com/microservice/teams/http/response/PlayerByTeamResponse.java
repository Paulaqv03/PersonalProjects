package com.microservice.teams.http.response;

import com.microservice.teams.entities.dto.PlayerDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlayerByTeamResponse {
    private String nameTeam;
    private String coach;
    private List<PlayerDTO> playerDTOS;
}
