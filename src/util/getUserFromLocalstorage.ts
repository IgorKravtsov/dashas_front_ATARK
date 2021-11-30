import {LocalstorageKey} from "../types/LocalstorageKey";
import {decodeJWT} from "./decodeJWT";
import {IUser} from "../models/IUser";


export const getUserFromLocalstorage = (): IUser | null | '' => {
    const token = localStorage.getItem(LocalstorageKey.PLANTS_WATERING_TOKEN);
    return  token && decodeJWT(token);
}