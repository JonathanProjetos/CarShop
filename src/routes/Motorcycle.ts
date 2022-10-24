import { Router } from 'express';
import CarController from '../controllers/Car';
import CarModel from '../models/Cars';
import CarService from '../services/Car';

const route = Router();

const model = new CarModel();
const service = new CarService(model);
const controller = new CarController(service);

const MOTORCYCLE_LINK = '/motorcycle';

route.post(MOTORCYCLE_LINK, (req, res) => controller.create(req, res));
route.get(MOTORCYCLE_LINK, (req, res) => controller.read(req, res));
route.delete(`${MOTORCYCLE_LINK}/:id`, (req, res) => controller.delete(req, res));
route.get(`${MOTORCYCLE_LINK}/:id`, (req, res) => controller.readOne(req, res));
route.put(`${MOTORCYCLE_LINK}/:id`, (req, res) => controller.update(req, res));

export default route;