import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import CarModel from '../../../models/Cars';
import { carMock, carsMocks, carMockId } from '../../mocks/ICar';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockId);
    sinon.stub(Model, 'find').resolves(carsMocks);
  });

  after(() => {
    sinon.restore();
  });

  describe('EndPoint create', () => {
    
    it('create successfully', async () => { 
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockId);
    });

  });

  describe('EndPoint read', () => {
    it('create successfully', async () => { 
      const newCars = await carModel.read();
      expect(newCars).to.be.deep.equal(carsMocks);
    });
  });

  

});