var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAllBeepers, addBeeper, getBeeperById } from "../service/bepperService.js";
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
        const { bepperId } = req.params;
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
        const beeper = req.body;
        const createdBeeper = yield addBeeper(beeper);
        res.status(201).send({ beeper: beeper });
    }
    catch (error) {
        res.status(500).send({ message: "Error create", error });
    }
});
