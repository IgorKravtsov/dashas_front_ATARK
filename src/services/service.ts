import axios, { AxiosResponse } from 'axios';
import {ILoginRegisterResponse} from "../models/ILoginRegisterResponse";

export class Service {
    static serverHost = process.env.DEVELOPMENT_SERVER_HOST || "//localhost:5000";

}

