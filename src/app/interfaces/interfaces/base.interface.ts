import { TypesEnum } from "../enums";

export interface BaseInterface {
    readonly _id: any;
    type: TypesEnum;
}

export interface BaseCreationInterface {
    type: TypesEnum;
}

export interface GenericInterface {
    [key: string]: Array<any> | string | number;
}


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}