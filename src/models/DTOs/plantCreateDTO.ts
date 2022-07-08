import {FertiliserCreateDTO} from "./fertiliserCreateDTO";

export interface PlantCreateDTO {
    name: string;
    wateringQuantity: number;
    periodOfWatering: string;
    pruningPeriod: number;
    officeId: number;
    userId: number;
    fertilisers?: FertiliserCreateDTO[];
}