import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class CarController {
  private _service: IService<IMotorcycle>;
  constructor(service: IService<IMotorcycle>) {
    this._service = service;
  }

  public async create(req:Request, res:Response<IMotorcycle>) {
    const { body } = req;
    const created = await this._service.create(body);
    return res.status(201).json(created);
  }

  public async readOne(req:Request, res:Response<IMotorcycle>) {
    const { id } = req.params;
    const findById = await this._service.readOne(id);
    return res.status(200).json(findById);
  }

  public async read(_req:Request, res:Response<IMotorcycle[]>) {
    const findAll = await this._service.read();
    return res.status(200).json(findAll);
  }

  public async delete(req:Request, res:Response<IMotorcycle>) {
    const { id } = req.params;
    await this._service.delete(id);
    return res.status(204).end();
  }
}

export default CarController;