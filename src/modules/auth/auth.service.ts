import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../user/user.model";
import SignupValidation from "../../common/validator/SignupValidation";
import SigninValidation from "../../common/validator/SigninValidation";

export const signupService = async (data: any) => {
  const { firstName, lastName, code, email, password, phoneNumber, role } = data;
  console.log({ firstName, lastName, code, email, password, phoneNumber, role });
  
  const { errors, isValid } = SignupValidation(data);
  if (!isValid) {
    return { status: 404, payload: errors };
  }

  const exist = await User.findOne({ email });
  if (exist) {
    errors.email = "Email already in use";
    return { status: 404, payload: { message: "Email is already in use", errors } };
  }

  const hashedpassword = bcrypt.hashSync(password, 8);
  await User.create({
    password: hashedpassword,
    firstName,
    lastName,
    code,
    email,
    phoneNumber,
    role,
  });

  return { status: 201, payload: { message: "Account Created" } };
};

export const signinService = async (data: any) => {
  const { email, password } = data;
  const { errors, isValid } = SigninValidation(data);

  if (!isValid) {
    return { status: 404, payload: errors };
  }

  const user: any = await User.findOne({ email });
  if (!user) {
    errors.email = "Email does not exist! Please enter the correct Email or create an account";
    return { status: 404, payload: errors };
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    errors.password = "Wrong Password";
    return { status: 404, payload: { message: "Password not matched", errors } };
  }

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    "sooraj_DOING_GOOD",
    { expiresIn: "8h" }
  );

  return {
    status: 201,
    payload: {
      token,
      role: user.role,
      userID: user._id,
      message: "Logged In Successfully",
    }
  };
};

export const verifyTokenService = async (token: string) => {
  if (!token) {
    return { status: 401, payload: { message: "No token provided" } };
  }
  try {
    const decoded = jwt.verify(token, "sooraj_DOING_GOOD");
    return { status: 200, payload: decoded };
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return { status: 401, payload: { message: "Token expired" } };
    }
    return { status: 401, payload: { message: "Invalid token" } };
  }
};

export const getUserService = async (id: string) => {
  try {
    const userdata: any = await User.findById(id);
    const data = {
      firstName: userdata.firstName,
      LastName: userdata.lastName,
      email: userdata.email,
    };
    return { status: 200, payload: data };
  } catch (error) {
    return { status: 401, payload: { message: "Get Req Failed" } };
  }
};
