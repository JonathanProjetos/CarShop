import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import { ZodError } from 'zod';
import MotoModel from '../../../models/Motocycle';
import MotoService from '../../../services/Motorcycle'
import { motocycleMock, motocycleMockAll, motocycleMockId } from '../../mocks/IMotocycle';
import { ErrorTypes } from '../../../errors/catalog';


describe('Moto Services', () => {

  const motoModel = new MotoModel();
  const motoServices = new MotoService(motoModel);

  before(async () => {
    sinon.stub(Model, 'create').resolves(motocycleMockId);
    sinon.stub(Model, 'find').resolves(motocycleMockAll);
    sinon.stub(Model, 'findOne')
    .onCall(0).resolves(motocycleMockId)
    .onCall(1).resolves(null);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motocycleMockId)
    .onCall(0).resolves(motocycleMockId)
    .onCall(1).resolves(null);
    sinon.stub(Model, 'findByIdAndDelete').resolves(motocycleMockId)
    .onCall(0).resolves(motocycleMockId)
    .onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  describe('EndPoint create', () => {

    it('sucessfully create', async () => {
      const moto = await motoServices.create(motocycleMock);
      expect(moto).to.be.equal(motocycleMockId);
    });

    it('create fail', async () => {
      let error;
      try {
        await motoServices.create({});
      } catch (err:any) {
        error = err
      };
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('EndPoint read', () => {
    it('sucessfully read', async () => {
      const motos = await motoServices.read();
      expect(motos).to.be.deep.equal(motocycleMockAll);
    });
  });

  describe('EndPoint readOne', () => {
    it('sucessfully readOne', async () => {
      const moto = await motoServices.readOne('62cf1fc6498565d94eba52cd')
      expect(moto).to.be.deep.equal(motocycleMockId);
    });

    it('readOne fail', async() => {
      let error;
      try {
        await motoServices.readOne('62cf1fc6498565d94eba52cd');
      } catch (err:any) {
        error = err
      };
      expect(error, 'error não definido').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
  });

  describe('EndPoint updated', () => {
    
    it('sucessfully updated', async() => {
      const moto = await motoServices.update('62cf1fc6498565d94eba52cd', motocycleMockId)
      expect(moto).to.be.deep.equal(motocycleMockId)
    });

    it('updated fail', async() => {
      let error;
      try {
        await motoServices.update('62cf1fc6498565d94eba52cd', motocycleMock);
      } catch (err:any) {
        error = err
      };

      expect(error, 'error não definido').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
  });

  describe('EndPoint delete', () => {
    it('sucessfully delete', async() => {
      const moto = await motoServices.delete('62cf1fc6498565d94eba52cd')
      expect(moto).to.be.deep.equal(motocycleMockId)
    });

    it('delete fail', async() => {
      let error;
      try {
        await motoServices.delete('62cf1fc6498565d94eba52cd');
      } catch (err:any) {
        error = err
      };

      expect(error, 'error não definido').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
  });

});