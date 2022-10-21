import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { ErrorTypes } from '../errors/catalog';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(obg: T): Promise<T> {
    const create = await this._model.create({ ...obg });
    return create;
  }
  public async read(): Promise<T[]> {
    const getAll = await this._model.find();
    return getAll;
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.invalidMongoid);
    const findId = await this._model.findById({ _id });
    return findId;
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.invalidMongoid);
    const del = await this._model.findOneAndDelete({ _id });
    return del;
  }

}

export default MongoModel;