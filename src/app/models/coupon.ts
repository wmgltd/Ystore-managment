export class Coupon {
    id: number;
    // tslint:disable-next-line: variable-name
    store_id: number;
    name: string;
    code: string;
    discount: number;
    // tslint:disable-next-line: variable-name
    discount_type: number;
    quantity: number;
    // tslint:disable-next-line: variable-name
    quantity_utilized: number;
    // tslint:disable-next-line: variable-name
    expiry_date: string;
    min_purchase_amount;
    including_shipping: boolean;
    status: number;
}
