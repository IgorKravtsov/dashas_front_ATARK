import axios, {AxiosResponse} from "axios";
import {Service} from "./service";
import {LocalstorageKey} from "../types/LocalstorageKey";
import {IOffice} from "../models/IOffice";
import {IPlant} from "../models/IPlant";


export class officeService {
    static async getPlantsByUserAndOffice(userId: number, officeId: number): Promise<AxiosResponse<IPlant[]>> {
        const token = localStorage.getItem(LocalstorageKey.PLANTS_WATERING_TOKEN);
        return axios.get<IPlant[]>(`${Service.serverHost}/api/plant/user_office`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {userId: userId, officeId: officeId}
        });
    }

    static async getOfficesByUserId(userId: number): Promise<AxiosResponse<IOffice[]>> {
        const token = localStorage.getItem(LocalstorageKey.PLANTS_WATERING_TOKEN);
        return axios.get<IOffice[]>(`${Service.serverHost}/api/office/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    }

    static async getAllOffices(): Promise<AxiosResponse<IOffice[]>> {
        const token = localStorage.getItem(LocalstorageKey.PLANTS_WATERING_TOKEN);
        return axios.get<IOffice[]>(`${Service.serverHost}/api/office/`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    }
}