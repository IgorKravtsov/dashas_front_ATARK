import axios, {AxiosResponse} from "axios";
import {IPlant} from "../models/IPlant";
import {LocalstorageKey} from "../types/LocalstorageKey";
import {Service} from "./service";
import {IFertiliser} from "../models/IFertiliser";


export class fertiliserService {
    static async getAllFertilisers(): Promise<AxiosResponse<IFertiliser[]>> {
        const token = localStorage.getItem(LocalstorageKey.PLANTS_WATERING_TOKEN);
        return axios.get<IFertiliser[]>(`${Service.serverHost}/api/fertiliser`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    }
}