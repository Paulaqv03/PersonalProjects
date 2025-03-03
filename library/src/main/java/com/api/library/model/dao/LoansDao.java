package com.api.library.model.dao;

import org.springframework.data.repository.CrudRepository;

import com.api.library.model.entity.Loans;

public interface LoansDao extends CrudRepository<Loans, Long>{
}
