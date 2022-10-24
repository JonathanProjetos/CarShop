import { Router } from 'express';
import MotoController from '../controllers/Motorcycle';
import MotoModel from '../models/Motocycle';
import MotoService from '../services/Motorcycle';

const route = Router();

const model = new MotoModel();
const service = new MotoService(model);
const controller = new MotoController(service);

const MOTORCYCLE_LINK = '/motorcycles';

route.post(MOTORCYCLE_LINK, (req, res) => controller.create(req, res));
route.get(MOTORCYCLE_LINK, (req, res) => controller.read(req, res));
route.delete(`${MOTORCYCLE_LINK}/:id`, (req, res) => controller.delete(req, res));
route.get(`${MOTORCYCLE_LINK}/:id`, (req, res) => controller.readOne(req, res));
route.put(`${MOTORCYCLE_LINK}/:id`, (req, res) => controller.update(req, res));

export default route;