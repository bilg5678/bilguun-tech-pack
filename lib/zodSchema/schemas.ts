import { ACCEPTED_IMAGE_TYPES } from "@/constant";
import * as z from "zod";
export const registerSchema = z.object({
  identityCard: z
    .any()
    .refine(
      (files) => Object.values(files).length === 1,
      "Иргэний үнэмлэхний зурагаа оруулна уу.",
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      ".jpg, .jpeg, .png зураг оруулна уу.",
    ),
  selfie: z
    .any()
    .refine(
      (files) => Object.values(files).length === 1,
      "Селфи зурагаа оруулна уу.",
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      ".jpg, .jpeg, .png зураг оруулна уу.",
    ),
});
