package com.redlack.redlack.services.exceptions;

public class ResourceNotFoundException extends RuntimeException{

    private static final long serialVersionUID = 1L;

    public  ResourceNotFoundException(Object obj){
        super("Recurso não encontrado. Parâmetro " + obj);
    }

}
