package com.api.library.model.dto;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class BooksDTO implements Serializable{
    private Long idBook;
    private String title;
    private String author;
    private boolean available;
    private List<LoansDTO> loansDTO;
}
