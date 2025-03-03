package com.api.library.model.dao;

import com.api.library.model.entity.Users;
import org.springframework.data.repository.CrudRepository;

public interface UsersDao extends CrudRepository<Users, Long> {
}
