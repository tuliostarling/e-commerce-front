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
    id: number;
    id_product: number;
    size: string;
    amount: number;
    old_price: number;
    price: number;
    material: string;
    promotion: boolean;
    discount: boolean;
    color: string;
    images: Array<object>;
}

export interface SubProductListModel {
    rows: Array<SubProductModel>;
    images: Array<any>;
}


export interface ImageObjectModel {
    url: string;
    key: string;
}
