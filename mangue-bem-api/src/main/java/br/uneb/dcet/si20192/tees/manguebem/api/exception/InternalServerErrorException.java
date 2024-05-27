package br.uneb.dcet.si20192.tees.manguebem.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpServerErrorException;

public class InternalServerErrorException extends HttpServerErrorException {

    private static final HttpStatus STATUS = HttpStatus.INTERNAL_SERVER_ERROR;

    public InternalServerErrorException() {
        super(STATUS);
    }

    public InternalServerErrorException(String message) {
        super(STATUS, message);
    }
}
