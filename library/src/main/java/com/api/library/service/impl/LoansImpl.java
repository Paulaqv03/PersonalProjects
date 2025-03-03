package com.api.library.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.library.model.dao.BooksDao;
import com.api.library.model.dao.LoansDao;
import com.api.library.model.dao.UsersDao;
import com.api.library.model.dto.LoansDTO;
import com.api.library.model.entity.Books;
import com.api.library.model.entity.Loans;
import com.api.library.model.entity.Users;
import com.api.library.service.ILoansService;

@Service
public class LoansImpl implements ILoansService{
    @Autowired
    private LoansDao loansDao;

    @Autowired
    private UsersDao usersDao;

    @Autowired 
    private BooksDao booksDao;
    

    @Transactional
    @Override
    public Loans save(LoansDTO loansDto) {
        Users users = usersDao.findById(loansDto.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        Books books = booksDao.findById(loansDto.getBookId())
                .orElseThrow(() -> new RuntimeException("Libro no encontrado"));

        Loans loans = Loans.builder()
                .idLoan(loansDto.getIdLoan())
                .users(users)
                .books(books)
                .loanDate(loansDto.getLoanDate())
                .returnDate(loansDto.getReturnDate())
                .build();
        return loansDao.save(loans);
    }

    @Transactional(readOnly = true)
    @Override
    public Loans findById(Long id) {
        return loansDao.findById(id).orElse(null);
    }

    @Transactional
    @Override
    public void delete(Loans loans) {
        loansDao.delete(loans);
    }

    @Override
    public boolean existsById(Long id) {
        return loansDao.existsById(id);
    }

    @Override
    public List<Loans> findAll() {
        return (List<Loans>) loansDao.findAll();
    }
}
