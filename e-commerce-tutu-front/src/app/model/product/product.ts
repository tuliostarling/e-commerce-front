export interface ProductModel {
    id: number;
    id_category: number;
    name: string;
    size: number;
    amount: number;
    price: number;
    discount: boolean;
    description: string;
    color: string;
    // images: Array<ImageModel>;
    files: string;
}

// export interface ImageModel {
//     id: number;
//     image_type: string;
//     image_name: string;
//     image: string;
// }
