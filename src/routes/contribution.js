import { Router } from "express";
import { saveContribution, getProjectContributions } from "../controlers/contribution";
const { body } = require('express-validator');

const router = Router();

/**
 * @swagger
 * /User:
 *  get:
 *    summary: Get all users
 */
router.post("/Contr", saveContribution);

router.get("/Contr/:id", getProjectContributions);
export default router;
