export interface HomeModel {
    id: number;
    type: string;
}

export interface CarouselImagesModel {
    id: number;
    location_aws: string;
    key_aws: string;
    id_home: number;
}

export interface TopSellingProductsModel {
    id: number;
    id_subproduct: number;
    id_home: number;
}
