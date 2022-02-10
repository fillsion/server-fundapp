import { Router } from "express";
const { body } = require('express-validator');
import {
  deleteProject,
  getSingleProject,
  getProject,
  getProjectCount,
  saveProject,
  updateProject,
} from "../controlers/project";
const router = Router();

/**
 * @swagger
 * /User:
 *  get:
 *    summary: Get all projects
 */
router.get("/project", getProject);

/**
 * @swagger
 * /User/count:
 *  get:
 *    summary: Get user count
 */
router.get("/project/count", getProjectCount);

/**
 * @swagger
 * /User/cedula:
 *  get:
 *    summary: Get single user
 */
router.get("/project/:id", getSingleProject);

/**
 * @swagger
 * /User:
 *  post:
 *    summary: save user into DB
 */
 router.post("/User", 
 body('name').isNumeric(),
 body('description').isLength({min:30}),
 body('scope').isLength({min:20}),
 body('tentativeDate').isDate(),
 body('type').isAlphanumeric(),
 body('state').isAlphanumeric(),
 saveProject);

/**
 * @swagger
 * /User/cedula:
 *  delete:
 *    summary: Delete user
 */
router.delete("/project/:id", deleteProject);

/**
 * @swagger
 * /User/cedula:
 *  put:
 *    summary: Update user
 */
router.put("/project/:cedula", updateProject);

export default router;
