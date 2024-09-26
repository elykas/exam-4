var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { StatusBeeper } from "../models/bepperModel.js";
import { writeToFile, readFromFile as readFromFile } from "../DAL/jsonDAL.js";
import { v4 as uuidv4 } from "uuid";
export const getAllBeepers = () => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromFile();
    if (!beepers || beepers.length === 0) {
        throw new Error('No beepers found');
    }
    return beepers !== null && beepers !== void 0 ? beepers : [];
});
export const addBeeper = (beeper) => __awaiter(void 0, void 0, void 0, function* () {
    let beepers = yield readFromFile();
    const beeperExists = beepers.some((existingBeeper) => existingBeeper.name === beeper.name);
    if (beeperExists) {
        throw new Error("Username already exists.");
    }
    const beeperId = uuidv4();
    const newBeeper = {
        id: beeperId,
        name: beeper.name,
        status: StatusBeeper.manufactured,
        created_at: new Date()
    };
    beepers = beepers ? [...beepers, newBeeper] : [newBeeper];
    yield writeToFile(beepers);
    return newBeeper;
});
export const getBeeperById = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!beeperId) {
        throw new Error('Beeper ID is required');
    }
    const beepers = yield readFromFile();
    if (!beepers || beepers.length === 0) {
        throw new Error('No beepers found');
    }
    const beeper = beepers.find(b => b.id === beeperId);
    if (!beeper) {
        throw new Error('User not found');
    }
    return beeper;
});
export const editBeeper = (beeperId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromFile();
    const beeper = beepers.find(b => b.id === beeperId);
    if (!beeper) {
        throw new Error('User not found');
    }
    //updateProperties(beeper, updatedData);
    yield writeToFile(beepers);
    return beeper;
});
