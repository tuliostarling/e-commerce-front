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
}

export interface ProductListModel {
    id_subproduct: number;
    name: string;
    id_product: number;
    price: string;
    location_aws: string;
}
