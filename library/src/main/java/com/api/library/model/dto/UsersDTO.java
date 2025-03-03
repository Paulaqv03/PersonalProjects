package com.api.library.model.dto;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class UsersDTO implements Serializable {
    private Long idUser;
    private String name;
    private String email;
    private List<LoansDTO> loansDTO;
}
