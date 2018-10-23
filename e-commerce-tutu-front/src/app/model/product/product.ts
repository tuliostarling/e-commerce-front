export interface ProductModel {
    id: number;
    id_category: number;
    name: string;
    description: string;

    subProduct: Array<SubProductModel>;
}

export interface RequestProductModel {
    total: number;
    rows: Array<ProductModel>;
}

export interface SubProductModel {
    id_product: number;
    size: number;
    amount: number;
    price: number;
    material: string;
    promotion: boolean;
    discount: boolean;
    color: string;
    images: Array<object>;
}

export interface ProductListModel {
    id_subproduct: number;
    name: string;
    id_product: number;
    price: string;
    location_aws: string;
}
