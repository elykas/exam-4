var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAllBeepers, addBeeper, getBeeperById, deleteBeeper, getBeeperByStatus, editBeeperStatus, detonateBeeper } from "../service/bepperService.js";
export const getAllBeepersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield getAllBeepers();
        if (beepers.length === 0) {
            res.status(404).json({ message: 'No beepers found for this user.' });
        }
        res.status(200).json({ beepers: beepers });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});
export const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bepperId = req.params.id;
        if (!bepperId) {
            res.status(400).json({ error: 'beeper ID is required.' });
        }
        const bepper = yield getBeeperById(bepperId);
        if (!bepper) {
            res.status(404).json({ message: 'No beeper found.' });
        }
        res.status(200).json({ bepper });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});
export const createBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeper = req.body.name;
        const createdBeeper = yield addBeeper(beeper);
        res.status(201).send({ beeper: createdBeeper });
    }
    catch (error) {
        res.status(500).send({ message: "Error create", error });
    }
});
export const deleteBeeperController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        if (!beeperId) {
            res.status(400).json({ error: 'beeper ID is required.' });
        }
        const deletedBeeper = yield deleteBeeper(beeperId);
        if (deletedBeeper) {
            res.status(200).json({ message: "Beeper deleted successfully." });
        }
        else {
            res.status(404).json({ error: "beeper not found." });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete the beeper' });
    }
});
export const getByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bepperStatus = req.params.status;
        if (!bepperStatus) {
            res.status(400).json({ error: 'beeper Status is required.' });
        }
        const bepperList = yield getBeeperByStatus(bepperStatus);
        if (bepperList.length === 0) {
            res.status(404).json({ message: 'No beepers found with this status.' });
        }
        res.status(200).json({ bepperList });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});
export const editByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bepperId = req.params.id;
        if (!bepperId) {
            res.status(400).json({ error: 'beeper ID is required.' });
        }
        const bepper = yield getBeeperById(bepperId);
        if (!bepper) {
            res.status(404).json({ message: 'No beeper found.' });
        }
        const updatedBeeper = yield editBeeperStatus(bepper);
        if (!updatedBeeper) {
            res.status(404).json({ message: 'No beeper found.' });
        }
        if (updatedBeeper.status === "deployed") {
            const { lat, lon } = req.body;
            if (!lat || !lon) {
                res.status(400).json({ error: "lat and lon are required." });
            }
            const detonatedBeeper = yield detonateBeeper(updatedBeeper, parseInt(lat), parseInt(lon));
            if (!detonatedBeeper) {
                res.status(404).json({ message: 'No beeper.' });
            }
        }
        res.status(200).json({ bepper });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});
