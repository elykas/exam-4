import { Beeper ,StatusBeeper } from "../models/bepperModel.js";
import { writeToFile, readFromFile as readFromFile } from "../DAL/jsonDAL.js";
import { v4 as uuidv4 } from "uuid";
import {coordinates} from "../models/location.js"

export const getAllBeepers = async () => {

    const beepers: Beeper[] = await readFromFile();

    if (!beepers || beepers.length === 0) {
        throw new Error('No beepers found');
    }

    return beepers ?? [];
};


export const addBeeper = async (beeper:string): Promise<Beeper | null> => {
    let beepers:Beeper[] = await readFromFile();
    const beeperExists = beepers.some(
        (existingBeeper) => existingBeeper.name === beeper
      );
      if (beeperExists) {
        throw new Error("Username already exists.");
      }

    const beeperId:string =uuidv4();

    const newBeeper:Beeper={
        id:beeperId,
        name:beeper,
        status:StatusBeeper.manufactured,
        created_at:new Date()
        }
   
    beepers = beepers ? [...beepers, newBeeper] : [newBeeper]; 
    await writeToFile(beepers); 

    return newBeeper; 
};


export const getBeeperById = async (beeperId: string): Promise<Beeper> => {

    const beepers: Beeper[] = await readFromFile();

    if (beepers.length === 0) {
        throw new Error('No beepers found');
    }

    const beeper = beepers.find(b => b.id === beeperId);

    if (!beeper) {
        throw new Error('Beeper not found');
    }

    return beeper;
};


const status = [StatusBeeper.manufactured,StatusBeeper.assembled,StatusBeeper.shipped,StatusBeeper.deployed]

export const editBeeperStatus = async(beeperId:string): Promise<Beeper> =>{
    const beepers: Beeper[] = await readFromFile();

    if (beepers.length === 0) {
        throw new Error('No beepers found');
    }

    const beeper = beepers.find(b => b.id === beeperId);

    if (!beeper) {
        throw new Error('Beeper not found');
    }

    const actualStatus = status.findIndex(s => s === beeper.status)
    if(actualStatus === -1){
        throw new Error('No status found');
    }

    beeper.status = status[actualStatus +1];

    await writeToFile(beepers);
    return beeper;
}

export const detonateBeeper = async(beeperId:string,lat:number,lon:number):Promise<Beeper> =>{

    const beepers = await readFromFile() as Beeper[];
        if (beepers.length === 0) {
            throw new Error('No beepers found');
        }
        
        const beeper = beepers.find(b => b.id === beeperId);

        if (!beeper) {
            throw new Error('Beeper not found');
        }

        const location = coordinates.find((l: {lat:number,lon:number}) => l.lat === lat && l.lon === lon)
        if(!location){
            throw new Error('No loa and lat found');
        }

        beeper.latitude = lat;
        beeper.longitude = lon;

        setTimeout(() => {
            beeper.status = StatusBeeper.detonated;
            beeper.detonated_at = new Date();
             writeToFile(beepers)
        }, 10000);

        
        await writeToFile(beepers)
        return beeper
}


export const editBeeperToDBJson = async (beeper:Beeper): Promise<Beeper> => {
    const beepers: Beeper[] = await readFromFile();
    if(!beepers){
        throw new Error("beepers does not exist")
    }
    const editBeeper = beepers.find(b => b.id === beeper.id);
    if(!editBeeper){
        throw new Error("The beeper was not found");
    }
    editBeeper.status = beeper.status
    if(beeper.latitude && beeper.longitude && beeper.detonated_at){
    editBeeper.latitude = beeper.latitude
    editBeeper.longitude = beeper.longitude
    editBeeper.detonated_at = beeper.detonated_at
    }
    await writeToFile(beepers);
    return beeper;
}
    

export const deleteBeeper =async(beeperId:string)=>{
    const beepers: Beeper[] = await readFromFile();

    if (beepers.length === 0) {
        throw new Error('No beepers found');
    }

    const bookIndex = beepers.findIndex(b => b.id === beeperId)
    if(bookIndex === -1){
        return null
    }

    beepers.splice(bookIndex,1)

    await writeToFile(beepers);
    return true;
}

   
export const getBeeperByStatus = async (beeperStatus: string): Promise<Beeper[]> => {

    if (!beeperStatus) {
        throw new Error('Beeper status is required');
    }

    const beepers: Beeper[] = await readFromFile();

    if (beepers.length === 0) {
        throw new Error('No beepers found');
    }

    const beeperList = beepers.filter(b => b.status === beeperStatus);

    if (beeperList.length === 0) {
        throw new Error('Beepers with this status not found');
    }

    return beeperList;
};







