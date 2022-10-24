import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const MotocycleZodSchema = VehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']), 
  engineCapacity: z.number().int().gte(0).lte(2500),
});

export type IMothocycle = z.infer<typeof MotocycleZodSchema>;
export { MotocycleZodSchema };    