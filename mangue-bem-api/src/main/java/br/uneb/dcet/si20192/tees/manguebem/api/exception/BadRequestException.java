package br.uneb.dcet.si20192.tees.manguebem.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

public class BadRequestException extends HttpClientErrorException {

    private static final HttpStatus STATUS = HttpStatus.BAD_REQUEST;

    public BadRequestException() {
        super(STATUS);
    }

    public BadRequestException(String message) {
        super(STATUS, message);
    }
}
