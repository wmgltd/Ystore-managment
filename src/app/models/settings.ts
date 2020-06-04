import { DeliveryType } from './delivery-type';

export class Settings {
    id : number;
    store_id : number;
    company_name:string;
    company_email:string;
    company_phone:string;
    company_city:string;
    company_address:string;
    external_facebook_page:string;
    external_instagram_page	:string;
    external_facebook_pixel	:string;
    external_google_analytics :string;
    main_banner:string;
    logo:string;
    delivery_types:DeliveryType[];
}
