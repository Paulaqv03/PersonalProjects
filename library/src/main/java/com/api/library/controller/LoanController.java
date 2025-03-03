package com.api.library.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.library.model.dto.LoansDTO;
import com.api.library.model.entity.Loans;
import com.api.library.payload.MessageResponse;
import com.api.library.service.ILoansService;

@RestController
@RequestMapping("/api/v1/")
public class LoanController {
    @Autowired
    private ILoansService loansService;

    @PostMapping("loan")
    public ResponseEntity<?> create(@RequestBody LoansDTO loansDTO){
        Loans loanSave = null;
        try{
            loanSave = loansService.save(loansDTO);
            return new ResponseEntity<>(MessageResponse.builder()
                    .message("Creado correctamente")
                    .object(LoansDTO.builder()
                        .idLoan(loanSave.getIdLoan())
                        .userId(loanSave.getUsers().getIdUser())
                        .bookId(loanSave.getBooks().getIdBook())
                        .loanDate(loanSave.getLoanDate())
                        .returnDate(loanSave.getReturnDate())
                        .build())
                    .build(),
                    HttpStatus.CREATED);
        }catch(DataAccessException e){
            return new ResponseEntity<>(
                MessageResponse.builder()
                    .message(e.getMessage())
                    .object(null)
                    .build(), HttpStatus.METHOD_NOT_ALLOWED);   
        }
    }

    @PutMapping("loan/{id}")
    public ResponseEntity<?> update(@RequestBody LoansDTO loans, @PathVariable Long id){
        Loans loansUpdate = null;
        try{
            if(loansService.existsById(id)){
                loans.setIdLoan(id);
                loansUpdate = loansService.save(loans);
                return new ResponseEntity<>(MessageResponse.builder()
                        .message("Actualizado correctamente")
                        .object(LoansDTO.builder()
                            .idLoan(loansUpdate.getIdLoan())
                            .userId(loansUpdate.getUsers().getIdUser())
                            .bookId(loansUpdate.getBooks().getIdBook())
                            .loanDate(loansUpdate.getLoanDate())
                            .returnDate(loansUpdate.getReturnDate())
                            .build())
                        .build(), HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>(
                    MessageResponse.builder()
                        .message("Registro del prestamo no encontrado")
                        .object(null)
                        .build(),HttpStatus.METHOD_NOT_ALLOWED);
            }
        }catch(DataAccessException e){
            return new ResponseEntity<>(
                MessageResponse.builder()
                    .message(e.getMessage())
                    .object(null)
                    .build(), HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @DeleteMapping("loan/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try{
            Loans loans = loansService.findById(id);
            loansService.delete(loans);
            return new ResponseEntity<>(loans, HttpStatus.NO_CONTENT);
        }catch(DataAccessException e){
            return new ResponseEntity<>(
                MessageResponse.builder()
                .message(e.getMessage())
                .object(null)
                .build(), HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @GetMapping("loan/{id}")
    public ResponseEntity<?> showById(@PathVariable Long id){
        Loans loans = loansService.findById(id);
        if(loans == null){
            return new ResponseEntity<>(
                MessageResponse.builder()
                .message("El registro no se ha encontrado")
                .object(null)
                .build(), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(
                MessageResponse.builder()
                    .message("Prestamo encontrado")
                    .object(LoansDTO.builder()
                        .idLoan(loans.getIdLoan())
                        .userId(loans.getUsers().getIdUser())
                        .bookId(loans.getBooks().getIdBook())
                        .loanDate(loans.getLoanDate())
                        .returnDate(loans.getReturnDate())
                        .build())
                    .build(), HttpStatus.OK);
    }

    @GetMapping("loan")
    public ResponseEntity<?> getAll(){
        List<Loans> loans = loansService.findAll();

        if(loans.isEmpty()){
            return new ResponseEntity<>(
                MessageResponse.builder()
                    .message("No hay registro de prestamos") 
                    .object(null)
                    .build(), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(
            MessageResponse.builder()
                .message("Lista obtenida")
                .object(loans)
                .build(), HttpStatus.OK);
    }
}
