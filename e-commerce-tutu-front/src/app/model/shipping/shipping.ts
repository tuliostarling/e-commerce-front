export interface InfoCepModel {
    cep: string;
    value: number;
}

export interface AdressModel {
    cep: string;
    city: string;
    neighborhood: string;
    state: string;
    street: string;
}

export interface RequestShippingModel {
    totalValue: Array<ValueModel>;
    adress: Array<AdressModel>;
}

export interface ValueModel {
    Codigo: number;
    Erro: object;
    MsgErro: object;
    Valor: number;
    ValorAvisoRecebimento: string;
    ValorMaoPropria: string;
    ValorSemAdicionais: string;
    ValorValorDeclarado: string;
}