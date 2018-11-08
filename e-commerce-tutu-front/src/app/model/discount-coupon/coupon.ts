export interface CouponModel {
    id: number;
    name: string;
    value: number;
    expire_at: Date;
    valid: Boolean;
}

export interface RequestCouponModel {
    total: number;
    rows: Array<CouponModel>;
}
