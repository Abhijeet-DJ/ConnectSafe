import { Router } from 'express'
import { signup , login , logout , updateProfile , checkAuth } from '../controllers/auth.controllers.js'
import { protectRoute } from '../middleware/auth.middleware.js';

const routes = Router()

routes.post('/signup', signup);

routes.post('/login', login);

routes.post('/logout', logout);

routes.put("/update-profile", protectRoute , updateProfile);

routes.get("/check", protectRoute , checkAuth);

export default routes