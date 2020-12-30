import { Coupon } from "./coupon";

export class Shipment {
    id: number;
    // tslint:disable-next-line: variable-name
    store_id: number;
    // tslint:disable-next-line: variable-name
    catalog_number: number;
    // tslint:disable-next-line: variable-name
    date_time: Date;
    name: string;
    sum: number;
    // tslint:disable-next-line: variable-name
    customer_name: string;
    // tslint:disable-next-line: variable-name
    customer_email: string;
    // tslint:disable-next-line: variable-name
    customer_address: string;
    // tslint:disable-next-line: variable-name
    customer_city: string;
    // tslint:disable-next-line: variable-name
    customer_zip: string;
    // tslint:disable-next-line: variable-name
    customer_phone: string;
    // tslint:disable-next-line: variable-name
    delivery_type_id: number;
    // tslint:disable-next-line: variable-name
    delivery_type: string;
    delivery_cost: number;
    condition: string;
    status: number;
    // tslint:disable-next-line: variable-name
    order_details: any[];
    hesh: string;
    reference: string;
    digit4: string;
    payments: string;
    payment_id: string;
    customer_company: string;
    customer_note: string;
    coupon: Coupon;
}
