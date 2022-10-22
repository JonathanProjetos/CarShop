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
    console.log(body);
    
    const created = await this._service.create(body);
    return res.status(201).json(created);
  }

  public async readOne(req:Request, res:Response<ICar>) {
    const { id } = req.params;
    const findById = await this._service.readOne(id);
    return res.status(200).json(findById);
  }

  public async read(_req:Request, res:Response<ICar[]>) {
    const findAll = await this._service.read();
    return res.status(200).json(findAll);
  }

  public async delete(req:Request, res:Response<ICar>) {
    const { id } = req.params;
    await this._service.delete(id);
    return res.status(204).end();
  }

  public async update(req:Request, res:Response<ICar>) {
    const { id } = req.params;
    const { body } = req;
    const updated = await this._service.update(id, body);
    return res.status(200).json(updated);
  }
}

export default CarController;