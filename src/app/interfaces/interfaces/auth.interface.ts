import { UserInterface } from "./user.interface";
import { PermissionEnum } from "../enums";

export interface LoginInterface {
  email: string;
  password: string;
}

export interface SignupInterface extends LoginInterface {
  passwordConfirm: string;
}

export interface SessionInterface {
  access_token: string;
  user: UserInterface;
  permission: PermissionEnum;
  role?: PermissionEnum;
  user_data?: object;
}

export interface CookieInterface {
  access_token?: string;
  role?: string;
}

export interface TokenInterface {
  uid: string;
  oid: string | undefined;
  acc: PermissionEnum.USER;
}
