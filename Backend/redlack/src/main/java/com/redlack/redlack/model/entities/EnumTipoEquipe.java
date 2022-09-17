package com.redlack.redlack.model.entities;

public enum EnumTipoEquipe {

    BACKEND(1),
    FRONTEND(2),
    TESTER(3);

    private int code;

    private EnumTipoEquipe(int code){
        this.code = code;
    }

    public int getCode(){
        return code;
    }

    public static EnumTipoEquipe valueOf(int code) {
        for (EnumTipoEquipe value : EnumTipoEquipe.values()) {
            if (value.getCode() == code) {
                return value;
            }
        }
        throw new IllegalArgumentException("Invalid EnumTipoEquipe code");
    }
}
