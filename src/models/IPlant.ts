import {IFertiliserPlant} from "./IFertiliserPlant";


export interface IPlant {
    id: number;
    name: string;
    wateringQuantity: number;
    periodOfWatering: string;
    pruningPeriod: number;
    plantingDate: Date;
    lastWateringTime: Date;
    lastPruningDate: Date;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    officeId: number;
    fertilisers: IFertiliserPlant[] | null;
}