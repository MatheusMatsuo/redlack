package com.redlack.redlack.exceptions;

public class EntidadeNaoEncontrada extends RuntimeException  {
    private static final long serialVersionUID = 1L;

    public EntidadeNaoEncontrada(Class<?> entityType, Long entityId) {
        super(entityType.getSimpleName() +  " não localizado para o id=" + entityId);
    }
}
