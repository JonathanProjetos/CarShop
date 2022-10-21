import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number().gte(2).lte(7),
  seatsQty: z.number().gte(2).lte(7),
});
export { CarZodSchema };
export type ICar = z.infer<typeof CarZodSchema>;