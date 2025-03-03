package com.api.library.service;

import java.util.List;

import com.api.library.model.dto.UsersDTO;
import com.api.library.model.entity.Users;

public interface IUsersService {
    Users save(UsersDTO users);
    Users findById(Long id);
    void delete(Users users);
    boolean existsById(Long id);
    List<Users> findAll();
}
