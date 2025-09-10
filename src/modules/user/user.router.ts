import { Router } from 'express';
import { UserController } from './user.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { googleSignIn } from './google.auth.handler'; 

const router = Router();
const userController = new UserController();

// Public routes
router.post('/register', userController.register.bind(userController));
router.post('/verify-email', userController.verifyEmail.bind(userController));
router.post('/login', userController.login.bind(userController));
router.post('/forgot-password', userController.forgotPassword.bind(userController));
router.post('/reset-password', userController.resetPassword.bind(userController));

router.post('/auth/google', googleSignIn);

// Protected routes (require authentication)
router.use(authMiddleware);

// Protected routes go here


export default router;