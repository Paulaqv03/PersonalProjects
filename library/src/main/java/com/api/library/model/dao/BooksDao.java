package com.api.library.model.dao;

import org.springframework.data.repository.CrudRepository;

import com.api.library.model.entity.Books;

public interface BooksDao extends CrudRepository<Books, Long>{    
}
