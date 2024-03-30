import { Router } from 'express';
import { getResponse } from '../Controllers/ai.controller';

const ai_route = Router();
ai_route.post('/ai', getResponse);

export default ai_route;
