import { IService } from '../interfaces/IService';
import { IMotorcycle, MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class MotoServices implements IService<IMotorcycle> {
  private _moto: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._moto = model;
  }

  public async create(obj: unknown): Promise<IMotorcycle> {
    const verify = MotorcycleZodSchema.safeParse(obj);

    if (!verify.success) throw verify.error;

    const created = await this._moto.create(verify.data);
    return created;
  }

  public async read(): Promise<IMotorcycle[]> {
    const findAll = await this._moto.read();
    return findAll;
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    const findById = await this._moto.readOne(_id);
    if (!findById) throw new Error(ErrorTypes.EntityNotFound);
    return findById;
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    const del = await this._moto.delete(_id);
    if (!del) throw new Error(ErrorTypes.EntityNotFound);
    
    return del;
  }

  public async update(_id: string, obg: unknown): Promise<IMotorcycle> {
    const verify = MotorcycleZodSchema.safeParse(obg);

    if (!verify.success) throw verify.error;

    const updated = await this._moto.update(_id, verify.data);

    if (!updated) throw new Error(ErrorTypes.EntityNotFound);

    return updated;
  }
}

export default MotoServices;