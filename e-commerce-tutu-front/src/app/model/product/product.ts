export interface ProductModel {
    id: number;
    id_fk: number;
    defaultProduct: boolean;
    name: string;
    size: number;
    amount: number;
    price: number;
    discount: boolean;
    description: string;
    color: string;
    image: Array<ImageModel>;
}

export interface ImageModel {
    image: string;
}
