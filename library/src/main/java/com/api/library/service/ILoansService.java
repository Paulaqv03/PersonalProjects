package com.api.library.service;

import java.util.List;

import com.api.library.model.dto.LoansDTO;
import com.api.library.model.entity.Loans;

public interface ILoansService {
    Loans save(LoansDTO loans);
    Loans findById(Long id);
    void delete(Loans loans);
    boolean existsById(Long id);
    List<Loans> findAll();
}
