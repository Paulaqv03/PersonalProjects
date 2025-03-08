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

import com.api.library.model.dto.BooksDTO;
import com.api.library.model.dto.LoansDTO;
import com.api.library.model.entity.Books;
import com.api.library.payload.MessageResponse;
import com.api.library.service.IBooksService;

import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("/api/v1/")
@Tag(name = "Gestion de Libros", description = "Operaciones relacionadas con los libros en una biblioteca")
public class BookController {
    @Autowired
    private IBooksService booksService;

    @PostMapping("book")
    public ResponseEntity<?> create(@RequestBody BooksDTO booksDTO){
        Books bookSave = null;
        try{
            bookSave = booksService.save(booksDTO);
            return new ResponseEntity<>(MessageResponse.builder()
                    .message("Creado correctamente")
                    .object(BooksDTO.builder()
                        .idBook(bookSave.getIdBook())
                        .title(bookSave.getTitle())
                        .author(bookSave.getAuthor())
                        .available(bookSave.isAvailable())
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

    @PutMapping("book/{id}")
    public ResponseEntity<?> update(@RequestBody BooksDTO books, @PathVariable Long id){
        Books bookUpdate = null;
        try{
            if(booksService.existsById(id)){
                books.setIdBook(id);
                bookUpdate = booksService.save(books);
                return new ResponseEntity<>(MessageResponse.builder()
                        .message("Actualizado correctamente")
                        .object(BooksDTO.builder()
                            .idBook(bookUpdate.getIdBook())
                            .title(bookUpdate.getTitle())
                            .author(bookUpdate.getAuthor())
                            .available(bookUpdate.isAvailable())
                            .build())
                        .build(), HttpStatus.CREATED);   
            }else{
                return new ResponseEntity<>(
                    MessageResponse.builder()
                        .message("Registro de libro no encontrado")
                        .object(null)
                        .build(),
                        HttpStatus.METHOD_NOT_ALLOWED);
            }
        }catch(DataAccessException e){
            return new ResponseEntity<>(   
                MessageResponse.builder()
                    .message(e.getMessage())
                    .object(null)
                    .build(), HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @DeleteMapping("book/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try{
            Books books = booksService.findById(id);
            booksService.delete(books);
            return new ResponseEntity<>(books, HttpStatus.NO_CONTENT);
        }catch(DataAccessException e){
            return new ResponseEntity<>(
                MessageResponse.builder()
                    .message(e.getMessage())
                    .object(null)
                    .build(), HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @GetMapping("book/{id}")
    public ResponseEntity<?> showById(@PathVariable Long id){
        Books books = booksService.findById(id);
        if(books == null){
            return new ResponseEntity<>(
                MessageResponse.builder()
                    .message("El registro no se ha encontrado")
                    .object(null)
                    .build(),
                    HttpStatus.NOT_FOUND);
        }

        List<LoansDTO> loansDTOs = books.getLoans().stream()
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
                    .message("Libro encontrado")
                    .object(BooksDTO.builder()
                            .idBook(books.getIdBook())
                            .title(books.getTitle())
                            .author(books.getAuthor())
                            .available(books.isAvailable())
                            .loansDTO(loansDTOs)
                            .build())
                    .build(), HttpStatus.OK);
    }

    @GetMapping("book")
    public ResponseEntity<?> getAll(){
        List<Books> books = booksService.findAll();

        if(books.isEmpty()){
            return new ResponseEntity<>(
                MessageResponse.builder()
                    .message("No hay libros registrado")
                    .object(null)
                    .build(), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(
            MessageResponse.builder()
                .message("Lista obtenida")
                .object(books)
                .build(), HttpStatus.OK);
    }
}
