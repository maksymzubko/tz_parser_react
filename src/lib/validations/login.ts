import * as zod from 'zod';

export const LoginValidation = zod.object({
  username: zod.string().min(3, 'Мінімум 3 символи!'),
  password: zod.string().min(3, 'Мінімум 3 символи!')
});
