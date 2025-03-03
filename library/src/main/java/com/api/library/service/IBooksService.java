package com.api.library.service;

import java.util.List;

import com.api.library.model.dto.BooksDTO;
import com.api.library.model.entity.Books;

public interface IBooksService {
    Books save(BooksDTO booksDTO);
    Books findById(Long id);
    void delete(Books books);
    boolean existsById(Long id);
    List<Books> findAll();
}
