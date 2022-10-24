import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import MotoModel from '../../../models/Motocycle';
import { motocycleMock, motocycleMockAll, motocycleMockId } from '../../mocks/IMotocycle';

describe('Moto Model', () => {
  const motoModel = new MotoModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(motocycleMockId);
    sinon.stub(Model, 'find').resolves(motocycleMockAll);
    sinon.stub(Model, 'findOne').resolves(motocycleMockId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motocycleMockId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(motocycleMockId);
  });

  after(() => {
    sinon.restore();
  });

  describe('EndPoint create', () => {
    
    it('create successfully', async () => { 
      const moto = await motoModel.create(motocycleMock);
      expect(moto).to.be.deep.equal(motocycleMockId);
    });

  });

  describe('EndPoint read', () => {

    it('read successfully', async () => { 
      const motos = await motoModel.read();
      expect(motos).to.be.deep.equal(motocycleMockAll);
    });

  });

  describe('EndPoint readOne', () => {

    it('readOne sucessfully', async () => {
      const moto = await motoModel.readOne('6356abd6f623c5b8c8a673d3');
      expect(moto).to.be.equal(motocycleMockId);
    });

    it('readOne fail', async () => {

      try {
        await motoModel.readOne('6356abd6f623c5b8c8a673d3');
      } catch (err:any) {
        expect(err.error).to.be.equal('InvalidMongoId')
      }
      
    })

  });

  describe('EndPoint update', () => {
    
    it('update sucessfully', async () => {
      const moto = await motoModel.update('6356abd6f623c5b8c8a673d3', motocycleMockId)
      expect(moto).to.be.deep.equal(motocycleMockId);
    });

    
    it('update fail', async () => {

      try {
        await motoModel.update('6356abd6f623c5b8c8a673d3', motocycleMockId);
      } catch (err:any) {
        expect(err.error).to.be.equal('InvalidMongoId')
      }
      
    })
    
  })

  describe('EndPoint delete', () => {

    it('delete sucessfully', async () => {
      const moto = await motoModel.delete('6356abd6f623c5b8c8a673d3');
      expect(moto).to.be.equal(motocycleMockId);
    });

    it('delete fail', async () => {

      try {
        await motoModel.delete('6356abd6f623c5b8c8a673d3');
      } catch (err:any) {
        expect(err.error).to.be.equal('InvalidMongoId')
      }
      
    })

  })

});