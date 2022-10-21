import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

class CarController {
  private _service: IService<ICar>;
  constructor(service: IService<ICar>) {
    this._service = service;
  }

  public async create(req:Request, res:Response<ICar>) {
    const { body } = req;

    const created = await this._service.create(body);
    return res.status(201).json(created);
  }

 
}

export default CarController;