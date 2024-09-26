import jsonfile from  'jsonfile';
import { Beeper } from '../models/bepperModel.js';

const DB_FILE_PATH = process.env.DB_FILE_PATH || './data/db.json';

export const readFromFile = async () => {
    try {
        return await jsonfile.readFile(DB_FILE_PATH);
    } catch (err) {
        console.error(err);
        return [];
    }
};

export const writeToFile = async (beppers: Beeper[]) => {
    try {
        await jsonfile.writeFile(DB_FILE_PATH, beppers);
    } catch (err) {
        console.error(err);
    }
};

