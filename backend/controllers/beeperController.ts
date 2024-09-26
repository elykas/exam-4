import { Request, Response } from "express";
import { getAllBeepers,addBeeper, getBeeperById, deleteBeeper, 
  getBeeperByStatus, editBeeperStatus,detonateBeeper } from "../service/bepperService.js";
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
        const bepperId = req.params.id;

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
      const beeper:string = req.body.name;
      const createdBeeper = await addBeeper(beeper);
      res.status(201).send({ beeper:createdBeeper});
    } catch (error) {
      res.status(500).send({ message: "Error create", error });
    }
  };


  export const deleteBeeperController = async(req: Request,res:Response) => {
    try {
        const beeperId: string = req.params.id;
     
        if (!beeperId) {
            res.status(400).json({ error: 'beeper ID is required.'});
        }

        const deletedBeeper = await deleteBeeper(beeperId)
        if(deletedBeeper){
            res.status(200).json({message: "Beeper deleted successfully."})
        }else {
             res.status(404).json({ error: "beeper not found." });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the beeper'});
    }
}



export const getByStatus = async(req: Request, res:Response):Promise<void> => {
  try {
      const bepperStatus: string = req.params.status;

      if(!bepperStatus){
           res.status(400).json({ error: 'beeper Status is required.' });
      }

      const bepperList = await getBeeperByStatus(bepperStatus);

      if (bepperList.length === 0) {
          res.status(404).json({ message: 'No beepers found with this status.' });
        }

      res.status(200).json({bepperList})
      
  } catch (error) {
      res.status(500).json({message: 'Internal Server Error', error});    
  }
}


export const editByIdController = async(req: Request, res:Response):Promise<void> => {
  try {
      const bepperId = req.params.id;

      if(!bepperId){
           res.status(400).json({ error: 'beeper ID is required.' });
      }

      const updatedBeeper = await editBeeperStatus(bepperId);
     
      if(!updatedBeeper){
        res.status(404).json({ message: 'No beeper found.' });
      }
    
      if(updatedBeeper.status === "deployed"){
          const {lat,lon} = req.body;
          if(!lat || !lon){
             res.status(400).json({ error: "lat and lon are required." });
          }
          const detonatedBeeper = await detonateBeeper(updatedBeeper.id,parseFloat(lat),parseFloat(lon))
          if(!detonatedBeeper){
            res.status(404).json({ message: 'No beeper.' });
            return;
          }
          else{
            res.status(200).json({detonatedBeeper})
            return;
          }
      }

      res.status(200).json({updatedBeeper})
      
  } catch (error) {
      res.status(500).json({message: 'Internal Server Error', error});    
  }
}



