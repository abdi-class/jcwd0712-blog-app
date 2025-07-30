import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4")
    .required("Password is required"),
});

export interface ISignInValue {
  email: string;
  password: string;
}
