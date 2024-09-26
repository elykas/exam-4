import { Beeper ,StatusBeeper } from "../models/bepperModel.js";
import { writeToFile, readFromFile as readFromFile } from "../DAL/jsonDAL.js";
import { v4 as uuidv4 } from "uuid";

export const getAllBeepers = async () => {

    const beepers: Beeper[] = await readFromFile();

    if (!beepers || beepers.length === 0) {
        throw new Error('No beepers found');
    }

    return beepers ?? [];
};


export const addBeeper = async (beeper:Beeper): Promise<Beeper | null> => {
    let beepers:Beeper[] = await readFromFile();
    const beeperExists = beepers.some(
        (existingBeeper) => existingBeeper.name === beeper.name
      );
      if (beeperExists) {
        throw new Error("Username already exists.");
      }

    const beeperId:string =uuidv4()

    const newBeeper:Beeper={
        id:beeperId,
        name:beeper.name,
        status:StatusBeeper.manufactured,
        created_at:new Date()
        }
   
    beepers = beepers ? [...beepers, newBeeper] : [newBeeper]; 
    await writeToFile(beepers); 

    return newBeeper; 
};


export const getBeeperById = async (beeperId: string): Promise<Beeper> => {

    if (!beeperId) {
        throw new Error('Beeper ID is required');
    }

    const beepers: Beeper[] = await readFromFile();

    if (!beepers || beepers.length === 0) {
        throw new Error('No beepers found');
    }

    const beeper = beepers.find(b => b.id === beeperId);

    if (!beeper) {
        throw new Error('User not found');
    }

    return beeper;
};

export const editBeeper = async(beeperId:string,updatedData:Beeper) =>{
    const beepers: Beeper[] = await readFromFile(); 

    const beeper = beepers.find(b => b.id === beeperId);

    if (!beeper) {
        throw new Error('User not found');
    }

    if (updatedData.status) {
        beeper.name = updatedData.name;
    }
    await writeToFile(beepers);
    return beeper;
}
    

export const deleteBeeper =async(beeperId:string)=>{
    const beepers: Beeper[] = await readFromFile(); 

    const beeper = beepers.find(b => b.id === beeperId);

    if (!beeper) {
        return null; 
    }

    const bookIndex = beeper.books.findIndex(b => b.id === bookId)
    if(bookIndex === -1){
        return null
    }

    beeper.books.splice(bookIndex,1)

    await writeUsersToFile(beepers);
    return true;

}

   





