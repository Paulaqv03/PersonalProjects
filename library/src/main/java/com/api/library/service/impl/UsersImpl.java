package com.api.library.service.impl;

import com.api.library.model.dao.UsersDao;
import com.api.library.model.dto.UsersDTO;
import com.api.library.model.entity.Users;
import com.api.library.service.IUsersService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsersImpl implements IUsersService {
    @Autowired
    private UsersDao usersDao;

    @Transactional
    @Override
    public Users save(UsersDTO usersDTO) {
        Users users = Users.builder()
                .idUser(usersDTO.getIdUser())
                .name(usersDTO.getName())
                .email(usersDTO.getEmail())
                .loans(null)
                .build();
        return usersDao.save(users);
    }

    @Transactional(readOnly = true)
    @Override
    public Users findById(Long id) {
        System.out.println("Buscando usuario con ID: " + id);
        return usersDao.findById(id).orElse(null);
    }

    @Transactional
    @Override
    public void delete(Users user) {
        usersDao.delete(user);
    }

    @Override
    public boolean existsById(Long id) {
        return usersDao.existsById(id);
    }

    @Transactional(readOnly = true)
    @Override
    public List<Users> findAll() {
        return (List<Users>) usersDao.findAll();
    }
}
