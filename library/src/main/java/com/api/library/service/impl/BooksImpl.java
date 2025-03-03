package com.api.library.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.library.model.dao.BooksDao;
import com.api.library.model.dto.BooksDTO;
import com.api.library.model.entity.Books;
import com.api.library.service.IBooksService;

@Service
public class BooksImpl implements IBooksService{
    @Autowired
    private BooksDao booksDao;

    @Transactional
    @Override
    public Books save(BooksDTO booksDTO) {
        Books books = Books.builder()
                .idBook(booksDTO.getIdBook())
                .title(booksDTO.getTitle())
                .author(booksDTO.getAuthor())
                .available(booksDTO.isAvailable())
                .build();
        return booksDao.save(books);
    }

    @Transactional(readOnly = true)
    @Override
    public Books findById(Long id) {
        return booksDao.findById(id).orElse(null);
    }

    @Transactional
    @Override
    public void delete(Books books) {
        booksDao.delete(books);
    }

    @Override
    public boolean existsById(Long id) {
        return booksDao.existsById(id);
    }

    @Override
    public List<Books> findAll() {
        return (List<Books>) booksDao.findAll();
    }
}
