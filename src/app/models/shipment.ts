export class Shipment {
    id : number;
    store_id : number;
    catalog_number:number;
    date_time:Date;
    name : string;
    sum : number;
    customer_firstname:string;
    customer_lastname:string;
    customer_address:string;
    customer_city:string;
    customer_zip:string;
    customer_phone:string;
    delivery_type_id:number;
    delivery_type:string;
    condition : string;
    status : number;
    order_details:any[];
}
