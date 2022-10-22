import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import CarModel from '../../../models/Cars';
import { carMock, carsMocks, carMockId, deleteCarMock } from '../../mocks/ICar';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockId);
    sinon.stub(Model, 'find').resolves(carsMocks);
    sinon.stub(Model, 'findOne').resolves(carMockId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockId);
  });

  after(() => {
    sinon.restore();
  });

  describe('EndPoint create', () => {
    
    it('create successfully', async () => { 
      const car = await carModel.create(carMock);
      expect(car).to.be.deep.equal(carMockId);
    });

  });

  describe('EndPoint read', () => {

    it('read successfully', async () => { 
      const cars = await carModel.read();
      expect(cars).to.be.deep.equal(carsMocks);
    });

  });

  describe('EndPoint readOne', () => {

    it('readOne sucessfully', async () => {
      const car = await carModel.readOne('62cf1fc6498565d94eba52cd');
      expect(car).to.be.equal(carMockId);
    });

    it('readOne fail', async () => {

      try {
        await carModel.readOne('62cf1fc6498565d94eba52cd');
      } catch (err:any) {
        expect(err.error).to.be.equal('InvalidMongoId')
      }
      
    })

  });

  describe('EndPoint update', () => {
    
    it('update sucessfully', async () => {
      const car = await carModel.update('62cf1fc6498565d94eba52cd', carMockId)
      expect(car).to.be.deep.equal(carMockId);
    });

    
    it('update fail', async () => {

      try {
        await carModel.update('62cf1fc6498565d94eba52cd', carMockId);
      } catch (err:any) {
        expect(err.error).to.be.equal('InvalidMongoId')
      }
      
    })
    
  })

  describe('EndPoint delete', () => {

    it('delete sucessfully', async () => {
      const car = await carModel.delete('62cf1fc6498565d94eba52cd');
      expect(car).to.be.equal(carMockId);
    });

    it('delete fail', async () => {

      try {
        await carModel.delete('62cf1fc6498565d94eba52cd');
      } catch (err:any) {
        expect(err.error).to.be.equal('InvalidMongoId')
      }
      
    })

  })

});