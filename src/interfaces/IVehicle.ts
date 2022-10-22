import { z } from 'zod';

const VehicleZodSchema = z.object({
  model: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be 3 or more characters long' }),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be 3 or more characters long' }),
  year: z.number().int().gte(1900).lte(2022),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});
export { VehicleZodSchema };
export type IVehicle = z.infer<typeof VehicleZodSchema>;