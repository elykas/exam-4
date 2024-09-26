import { Request, Response } from "express";
import { getAllBeepers,addBeeper, getBeeperById } from "../service/bepperService.js";
import { Beeper } from "../models/bepperModel.js";




export const getAllBeepersController = async(req: Request, res:Response) => {
    try {

        const beepers = await getAllBeepers();

        if (beepers.length === 0) {
             res.status(404).json({ message: 'No beepers found for this user.' });
          }

        res.status(200).json({beepers: beepers})
        
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error});    
    }
}



export const getById = async(req: Request, res:Response):Promise<void> => {
    try {
        const {bepperId} = req.params;

        if(!bepperId){
             res.status(400).json({ error: 'beeper ID is required.' });
        }

        const bepper = await getBeeperById(bepperId);

        if (!bepper) {
            res.status(404).json({ message: 'No beeper found.' });
          }

        res.status(200).json({bepper})
        
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error});    
    }
}



export const createBeeper = async (req: Request, res: Response) => {
    try {
      const beeper:Beeper = req.body;
      const createdBeeper = await addBeeper(beeper);
      res.status(201).send({ beeper:beeper});
    } catch (error) {
      res.status(500).send({ message: "Error create", error });
    }
  };


