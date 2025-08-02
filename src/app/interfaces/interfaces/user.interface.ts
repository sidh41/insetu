import { BaseInterface } from "./base.interface";
import { TypesEnum } from "../enums";

export interface UserInterface extends BaseInterface, BaseUserInterface {
  type: TypesEnum.USER;
}

export interface BaseUserInterface {
  type: TypesEnum.USER;
  id: string;
  email_id: string;
  user_token: string;
  phone: string;
  user_plan: string;
  password?: string;
  payments_id?: string;
  user_mobile?: string;
  user_age?: number;
  user_first_name?: string;
  user_last_name: string;
  api_key: string;
  totp: string;
  api_secret: string;
  date_created?: Date;
}

export interface ScripTokens {
  id: number
  token: string
  symbol: string
  name: string
  exch_seg: string
}
