import { DeliveryType } from './delivery-type';

export class Settings {
    id: number;
    // tslint:disable-next-line: variable-name
    store_id: number;
    // tslint:disable-next-line: variable-name
    company_name: string;
    // tslint:disable-next-line: variable-name
    company_email: string;
    // tslint:disable-next-line: variable-name
    company_phone: string;
    // tslint:disable-next-line: variable-name
    company_city: string;
    // tslint:disable-next-line: variable-name
    company_subdomain: string;
    // tslint:disable-next-line: variable-name
    company_address: string;
    // tslint:disable-next-line: variable-name
    external_facebook_page: string;
    // tslint:disable-next-line: variable-name
    external_instagram_page: string;
    // tslint:disable-next-line: variable-name
    external_facebook_pixel: string;
    // tslint:disable-next-line: variable-name
    external_google_analytics: string;
    // tslint:disable-next-line: variable-name
    main_banner: string;
    logo: string;
    // tslint:disable-next-line: variable-name
    delivery_types: DeliveryType[];
    yaad_masof;
    yaad_clearing: any;
}
