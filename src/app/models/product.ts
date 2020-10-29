export class Product {
    id: number;
    // tslint:disable-next-line: variable-name
    store_id: number;
    name: string;
    img: string;
   // fileSource:any;
    description: string;
    provider: string;
    // tslint:disable-next-line: variable-name
    english_name: string;
    // tslint:disable-next-line: variable-name
    english_description: string;
    // tslint:disable-next-line: variable-name
    category_id: number;
    // tslint:disable-next-line: variable-name
    catalog_number: number;
    price: number;
    // tslint:disable-next-line: variable-name
    sale_price: number;
    // tslint:disable-next-line: variable-name
    stock_units: number;
    status: number;
    files: any[];
}
