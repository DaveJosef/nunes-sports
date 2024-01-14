package com.everymind.nunessports.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CodeAlreadyExistsException extends Exception {

    public CodeAlreadyExistsException(String code) {
        super(String.format("Product with code %s already exists", code));
    }
}
