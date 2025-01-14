import i18next from "i18next"
import { z } from "zod"
import { castNumber } from "./cast-number"

/**
 * Validates that an optional value is an integer.
 */
export const optionalInt = z
  .union([z.string(), z.number()])
  .optional()
  .refine(
    (value) => {
      if (value === "" || value === undefined) {
        return true
      }

      return Number.isInteger(castNumber(value))
    },
    {
      message: i18next.t("validation.mustBeInt"),
    }
  )
  .refine(
    (value) => {
      if (value === "" || value === undefined) {
        return true
      }

      return castNumber(value) >= 0
    },
    {
      message: i18next.t("validation.mustBePositive"),
    }
  )
