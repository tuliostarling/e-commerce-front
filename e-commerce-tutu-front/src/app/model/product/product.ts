export interface ProductModel {
    id: number;
    id_category: number;
    name: string;
    description: string;
}


export interface SubProductModel {
    id_product: number;
    size: number;
    amount: number;
    price: number;
    promotion: boolean;
    discount: boolean;
    color: string;
}

export interface ProductListModel {
    id_subproduct: number;
    name: string;
    id_product: number;
    price: string;
    location_aws: string;
}
