import { z } from 'zod';

// Types

export type IUser = z.infer<typeof User>;

// inputSchemas

export const User = z.object({
  login: z.string().optional(),
  senha: z.string(),
  nome: z.string()
});
