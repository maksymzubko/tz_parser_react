import * as zod from 'zod';

export const ArticleOptionsValidation = zod.object({
  sortBy: zod.string().default('ASC'),
  search: zod.string(),
  category: zod.string()
});
