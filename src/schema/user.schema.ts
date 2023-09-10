import { TypeOf, object, string } from 'zod'

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required"
    }),
    email: string({
      required_error: "Email is required"
    }).email('Not a valid email'),
    password: string({
      required_error: "Password is required"
    })
      .min(6, "Password is too short - should be 6 chars minimum"),
    confirmPassword: string({
      required_error: "Confirmation Password is required"
    })
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"]
  })
})

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.confirmPassword"
> 