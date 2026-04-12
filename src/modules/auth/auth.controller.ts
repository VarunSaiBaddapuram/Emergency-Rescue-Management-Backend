import * as authService from "./auth.service";

export default {
  signup: async (req: any, res: any) => {
    try {
      const response = await authService.signupService(req.body);
      return res.status(response.status).json(response.payload);
    } catch (error: any) {
      console.log("cont", error.message);
      return res.status(500).json({ message: "Server Error" });
    }
  },

  signin: async (req: any, res: any) => {
    try {
      const response = await authService.signinService(req.body);
      return res.status(response.status).json(response.payload);
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({ message: "Server Error" });
    }
  },

  verifyToken: async (req: any, res: any) => {
    try {
      const response = await authService.verifyTokenService(req.body.token);
      return res.status(response.status).json(response.payload);
    } catch (error: any) {
      return res.status(500).json({ message: "Server Error" });
    }
  },

  getUser: async (req: any, res: any) => {
    try {
      const response = await authService.getUserService(req.params.id);
      return res.status(response.status).json(response.payload);
    } catch (error: any) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
};
