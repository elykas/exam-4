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
import { coordinates } from "../models/location.js";
export const getAllBeepers = () => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromFile();
    if (!beepers || beepers.length === 0) {
        throw new Error('No beepers found');
    }
    return beepers !== null && beepers !== void 0 ? beepers : [];
});
export const addBeeper = (beeper) => __awaiter(void 0, void 0, void 0, function* () {
    let beepers = yield readFromFile();
    const beeperExists = beepers.some((existingBeeper) => existingBeeper.name === beeper);
    if (beeperExists) {
        throw new Error("Username already exists.");
    }
    const beeperId = uuidv4();
    const newBeeper = {
        id: beeperId,
        name: beeper,
        status: StatusBeeper.manufactured,
        created_at: new Date()
    };
    beepers = beepers ? [...beepers, newBeeper] : [newBeeper];
    yield writeToFile(beepers);
    return newBeeper;
});
export const getBeeperById = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromFile();
    if (beepers.length === 0) {
        throw new Error('No beepers found');
    }
    const beeper = beepers.find(b => b.id === beeperId);
    if (!beeper) {
        throw new Error('Beeper not found');
    }
    return beeper;
});
const status = [StatusBeeper.manufactured, StatusBeeper.assembled, StatusBeeper.shipped, StatusBeeper.deployed];
export const editBeeperStatus = (beeper) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromFile();
    if (beepers.length === 0) {
        throw new Error('No beepers found');
    }
    const actualStatus = status.findIndex(s => s === beeper.status);
    if (actualStatus === -1) {
        throw new Error('No status found');
    }
    if (actualStatus === status.length - 1) {
    }
    beeper.status = status[actualStatus + 1];
    yield writeToFile(beepers);
    return beeper;
});
export const detonateBeeper = (beeper, lat, lon) => __awaiter(void 0, void 0, void 0, function* () {
    const location = coordinates.find((l) => l.lat === lat && l.lon === lon);
    if (!location) {
        throw new Error('No loa and lat found');
    }
    beeper.latitude = lat;
    beeper.longitude = lon;
    setTimeout(() => {
        beeper.status = StatusBeeper.detonated;
        beeper.detonated_at = new Date();
    }, 10000);
    const beepers = yield readFromFile();
    if (beepers.length === 0) {
        throw new Error('No beepers found');
    }
    yield writeToFile(beepers);
    return beeper;
});
export const deleteBeeper = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromFile();
    if (beepers.length === 0) {
        throw new Error('No beepers found');
    }
    const bookIndex = beepers.findIndex(b => b.id === beeperId);
    if (bookIndex === -1) {
        return null;
    }
    beepers.splice(bookIndex, 1);
    yield writeToFile(beepers);
    return true;
});
export const getBeeperByStatus = (beeperStatus) => __awaiter(void 0, void 0, void 0, function* () {
    if (!beeperStatus) {
        throw new Error('Beeper status is required');
    }
    const beepers = yield readFromFile();
    if (beepers.length === 0) {
        throw new Error('No beepers found');
    }
    const beeperList = beepers.filter(b => b.status === beeperStatus);
    if (beeperList.length === 0) {
        throw new Error('Beepers with this status not found');
    }
    return beeperList;
});
