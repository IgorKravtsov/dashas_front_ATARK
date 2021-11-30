import axios, {AxiosResponse} from "axios";
import {ILoginRegisterResponse} from "../models/ILoginRegisterResponse";
import {Service} from "./service";
import {UserRoles} from "../models/userRoles";

export class UserService {
    static async login(email: string, password: string) {
        const body = {email, password};
        return axios.post(`${Service.serverHost}/api/user/login`, body);
    }

    static async register(email: string, password: string, role: UserRoles, officeId: number) {
        const body = {email, password, role, officeId};
        return axios.post(`${Service.serverHost}/api/user/registration`, body);
    }
}