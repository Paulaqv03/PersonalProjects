package com.api.library.controller;

import com.api.library.model.dto.LoansDTO;
import com.api.library.model.dto.UsersDTO;
import com.api.library.model.entity.Users;
import com.api.library.payload.MessageResponse;
import com.api.library.service.IUsersService;

import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/")
@Tag(name = "Gestion de Usuarios", description = "Operaciones relacionadas con los usuarios de una libreria")
public class UsersController {
    @Autowired
    private IUsersService usersService;

    @PostMapping("user")
    public ResponseEntity<?> create(@RequestBody UsersDTO users){
        Users userSave = null;
        try {
            userSave = usersService.save(users);
            return new ResponseEntity<>(MessageResponse.builder()
                    .message("Guardado correctamente")
                    .object(UsersDTO.builder()
                        .idUser(userSave.getIdUser())
                        .name(userSave.getName())
                        .email(userSave.getEmail())
                        .build())
                    .build(), 
                    HttpStatus.CREATED);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(
                MessageResponse.builder()
                    .message(e.getMessage())
                    .object(null)
                    .build(), HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @PutMapping("user/{id}")
    public ResponseEntity<?> update(@RequestBody UsersDTO users, @PathVariable Long id){
        Users userUpdate = null;
        try{
            if(usersService.existsById(id)){
                users.setIdUser(id);
                userUpdate = usersService.save(users);
                return new ResponseEntity<>(MessageResponse.builder()
                        .message("Actualizado correctamente")
                        .object(UsersDTO.builder()
                            .idUser(userUpdate.getIdUser())
                            .name(userUpdate.getName())
                            .email(userUpdate.getEmail())
                            .build())
                        .build(),
                        HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>(
                    MessageResponse.builder()
                        .message("Registro no encontrado ")
                        .object(null)
                        .build(), 
                        HttpStatus.METHOD_NOT_ALLOWED);
            }
        }catch(DataAccessException e){
            return new ResponseEntity<>(
                    MessageResponse.builder()
                        .message(e.getMessage())
                        .object(null)
                        .build(),
                        HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @DeleteMapping("user/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            Users users = usersService.findById(id);
            usersService.delete(users);
            return new ResponseEntity<>(users, HttpStatus.NO_CONTENT);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(
                MessageResponse.builder()
                    .message(e.getMessage())
                    .object(null)
                    .build(), HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @GetMapping("user/{id}")
    public ResponseEntity<?> showById(@PathVariable Long id){
        Users user = usersService.findById(id);
        if(user == null){
            return new ResponseEntity<>(
                MessageResponse.builder()
                    .message("El registro que intenta buscar no existe")
                    .object(null)
                    .build(),
                    HttpStatus.NOT_FOUND);   
        }

        List<LoansDTO> loansDTOs = user.getLoans().stream()
                .map(loan -> LoansDTO.builder()
                    .idLoan(loan.getIdLoan())
                    .userId(loan.getUsers().getIdUser())
                    .bookId(loan.getBooks().getIdBook())
                    .loanDate(loan.getLoanDate())
                    .returnDate(loan.getReturnDate())
                    .build())
                .toList();
        
        return new ResponseEntity<>(
                MessageResponse.builder()
                    .message("Usuario encontrado")
                    .object(UsersDTO.builder()
                            .idUser(user.getIdUser())
                            .name(user.getName())
                            .email(user.getEmail())
                            .loansDTO(loansDTOs)
                            .build())
                    .build(),
                HttpStatus.OK);   
    }

    @GetMapping("user")
    public ResponseEntity<?> getAllUsers(){
        List<Users> users = usersService.findAll();

        if(users.isEmpty()){
            return new ResponseEntity<>(
                MessageResponse.builder()
                    .message("No hay usuarios registrados")
                    .object(null)
                    .build(), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(
            MessageResponse.builder()
                .message("Lista obtenida")
                .object(users)
                .build(), HttpStatus.OK);
    }
}
