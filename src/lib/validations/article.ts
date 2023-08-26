import * as zod from 'zod';

export const ArticleValidation = zod.object({
  title: zod.string(),
  sourceLink: zod.string().url({ message: 'Неправильне посилання' }).optional().or(zod.literal('')),
  content: zod.string().min(20, 'Мінімум 20 символів!'),
  image: zod
    .string()
    .url()
    .regex(/\.(jpeg|jpg|gif|png|bmp|webp)$/i, { message: 'Неправильне посилання (.jpeg,.png,.gif)' })
    .optional()
    .or(zod.literal('')),
  category: zod.string().optional()
});
