// routes/userRoute.js

import express from 'express';
const router = express.Router();
import * as userController from './user.controller';

router.get('/user-data', userController.getUserData);

export default router;
