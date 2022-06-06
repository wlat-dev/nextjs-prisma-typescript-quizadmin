import * as z from "zod"

export const ImageUrlModel = z.object({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date().nullish(),
})
