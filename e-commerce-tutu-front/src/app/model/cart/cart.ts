export interface CartModel {
    id: number;
    id_item: number;
    location_aws: string;
    name: string;
    price: number;
    qtd: number;
    size: string;
}

export interface RequestCartModel {
    qtdOptions: Array<Number>;
    rows: Array<CartModel>;
    pricesObj: RequestpricesObjModel;
}

export interface RequestpricesObjModel {
    finalValue: number;
}
