package com.api.library.model.dto;

import java.time.LocalDate;

import lombok.*;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class LoansDTO implements Serializable{
    private Long idLoan;
    private Long userId;
    private Long bookId;
    private LocalDate loanDate;
    private LocalDate returnDate;
}
