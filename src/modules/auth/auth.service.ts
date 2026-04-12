import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as authRepository from "./auth.repository";
import SignupValidation from "../../common/validator/SignupValidation";
import SigninValidation from "../../common/validator/SigninValidation";
import { AppError } from "../../common/errors/AppError";
import { logger } from "../../common/logger/logger";

export const signupService = async (data: any) => {
  const { firstName, lastName, code, email, password, phoneNumber, role } = data;
  console.log({ firstName, lastName, code, email, password, phoneNumber, role });
  
  const { errors, isValid } = SignupValidation(data);
  if (!isValid) {
    throw new AppError({ message: "Validation failed", statusCode: 404, errors });
  }

  const exist = await authRepository.findOneUser({ email });
  if (exist) {
    errors.email = "Email already in use";
    throw new AppError({ message: "Email is already in use", statusCode: 404, errors });
  }

  const hashedpassword = bcrypt.hashSync(password, 8);
  await authRepository.createUser({
    password: hashedpassword,
    firstName,
    lastName,
    code,
    email,
    phoneNumber,
    role,
  });

  logger.info({ email, role }, "New user account created");

  return { message: "Account Created" };
};

export const signinService = async (data: any) => {
  const { email, password } = data;
  const { errors, isValid } = SigninValidation(data);

  if (!isValid) {
    throw new AppError({ message: "Validation failed", statusCode: 404, errors });
  }

  const user: any = await authRepository.findOneUser({ email });
  if (!user) {
    errors.email = "Email does not exist! Please enter the correct Email or create an account";
    throw new AppError({ message: "Authentication failed", statusCode: 404, errors });
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    errors.password = "Wrong Password";
    throw new AppError({ message: "Password not matched", statusCode: 404, errors });
  }

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    "sooraj_DOING_GOOD",
    { expiresIn: "8h" }
  );

  return {
    token,
    role: user.role,
    userID: user._id,
    message: "Logged In Successfully",
  };
};

export const verifyTokenService = async (token: string) => {
  if (!token) {
    throw new AppError({ message: "No token provided", statusCode: 401 });
  }
  try {
    const decoded = jwt.verify(token, "sooraj_DOING_GOOD");
    return decoded;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new AppError({ message: "Token expired", statusCode: 401 });
    }
    throw new AppError({ message: "Invalid token", statusCode: 401 });
  }
};

export const getUserService = async (id: string) => {
  const userdata: any = await authRepository.findUserById(id);
  if (!userdata) {
    throw new AppError({ message: "Get Req Failed", statusCode: 401 });
  }
  return {
    firstName: userdata.firstName,
    LastName: userdata.lastName,
    email: userdata.email,
  };
};
