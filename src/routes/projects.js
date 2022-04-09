import { Router } from "express";
const { body } = require("express-validator");
import {
  deleteProject,
  getSingleProject,
  getProject,
  getProjectCount,
  saveProject,
  updateProject,
  userProjects,
  getSearchProjects,
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
//router.get("/project/count", getProjectCount);

/**
 * @swagger
 * /User/cedula:
 *  get:
 *    summary: Get single user
 */
//router.get("/project/:id", getSingleProject);

/**
 * @swagger
 * /User:
 *  post:
 *    summary: save user into DB
 */
router.post(
  "/project",
  body("name").isLength({ min: 1 }),
  body("description").isLength({ min: 30 }),
  body("scope").isLength({ min: 20 }),
  body("tentativeDate").isLength({ min: 1 }),
  body("type").isLength({ min: 1 }),
  body("state").isLength({ min: 1 }),
  body("rate").isFloat({ min: 9, max: 20 }),
  body("totalMount").isNumeric({ min: 50000000, max: 3000000000 }),
  body("payFrecuency").isLength({ min: 1 }),
  saveProject
);

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
//router.put("/project/:cedula", updateProject);

router.get("/project/userProjects/:userID", userProjects);

router.get("/project/search/:search", getSearchProjects);
export default router;
