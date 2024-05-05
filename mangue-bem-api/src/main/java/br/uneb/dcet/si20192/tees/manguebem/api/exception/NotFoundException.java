package br.uneb.dcet.si20192.tees.manguebem.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

public class NotFoundException extends HttpClientErrorException {

    private static final HttpStatus STATUS = HttpStatus.NOT_FOUND;

    public NotFoundException() {
        super(STATUS);
    }

    public NotFoundException(String message) {
        super(STATUS, message);
    }
}
