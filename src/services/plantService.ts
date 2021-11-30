import axios, {AxiosResponse} from "axios";
import {IPlant} from "../models/IPlant";
import {LocalstorageKey} from "../types/LocalstorageKey";
import {Service} from "./service";
import {PlantCreateDTO} from "../models/DTOs/plantCreateDTO";


export class plantService {
    static async getInfoPlantById(plantId: number): Promise<AxiosResponse<IPlant>> {
        const token = localStorage.getItem(LocalstorageKey.PLANTS_WATERING_TOKEN);
        return axios.get<IPlant>(`${Service.serverHost}/api/plant/${plantId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    }

    static async create(plant: PlantCreateDTO): Promise<AxiosResponse<IPlant>> {
        const token = localStorage.getItem(LocalstorageKey.PLANTS_WATERING_TOKEN);
        return axios.post<IPlant>(`${Service.serverHost}/api/plant/`, plant,{
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    }

    static async deleteOne(plantId: number): Promise<AxiosResponse<IPlant>> {
        const token = localStorage.getItem(LocalstorageKey.PLANTS_WATERING_TOKEN);
        return axios.delete<IPlant>(`${Service.serverHost}/api/plant/${plantId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    }
}