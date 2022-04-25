import { Router } from "express";
const { body } = require("express-validator");
import {
  deleteUser,
  getSingleUser,
  getUser,
  getUserCount,
  saveUser,
  updateUser,
  getUserByMail,
  authenticateUser,
} from "../controlers/Users";
const router = Router();

/**
 * @swagger
 * /User:
 *  get:
 *    summary: Get all users
 */
router.get("/User", getUser);

/**
 * @swagger
 * /User/count:
 *  get:
 *    summary: Get user count
 */
router.get("/User/count", getUserCount);

/**
 * @swagger
 * /User/cedula:
 *  get:
 *    summary: Get single user
 */
router.get("/User/:id", getSingleUser);

/**
 * @swagger
 * /User:
 *  post:
 *    summary: save user into DB
 */
//router.post("/User", saveUser);
router.post(
  "/User",
  body("name").isAlpha(),
  body("surname").isAlpha(),
  body("password").isLength({ min: 6 }),
  body("mail").isEmail(),
  body("phone").isMobilePhone(),
  body("postalCode").isLength({ min: 6, max: 6 }).isNumeric(),
  body("city").isAlpha(),
  saveUser
);
/**
 * @swagger
 * /User/cedula:
 *  delete:
 *    summary: Delete user
 */
router.delete("/User/delete/:id", deleteUser);

/**
 * @swagger
 * /User/cedula:
 *  put:
 *    summary: Update user
 */
router.put("/User/update/:id", updateUser);

router.get("/User/:Mail", getUserByMail);

router.get("/User/authenticate/:Mail/:Password", authenticateUser);
export default router;
