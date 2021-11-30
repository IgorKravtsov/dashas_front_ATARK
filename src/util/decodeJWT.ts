import jwtDecode from "jwt-decode";
import {IUser} from "../models/IUser";


export const decodeJWT = (token: string): IUser => {
    return jwtDecode<IUser>(token);
}