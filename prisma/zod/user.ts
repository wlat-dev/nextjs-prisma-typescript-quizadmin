import * as z from "zod"
import { Role } from "@prisma/client"
import { CompleteAccount, RelatedAccountModel, CompleteSession, RelatedSessionModel, CompleteInstructor, RelatedInstructorModel, CompleteStudent, RelatedStudentModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  role: z.nativeEnum(Role),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
  instructor: CompleteInstructor[]
  student?: CompleteStudent | null
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  accounts: RelatedAccountModel.array(),
  sessions: RelatedSessionModel.array(),
  instructor: RelatedInstructorModel.array(),
  student: RelatedStudentModel.nullish(),
}))
