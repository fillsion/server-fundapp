import { Router } from "express";
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
router.post("/User/:Mail/:Password/:VerifyPassword/:Name/:Surname/:Phone/:PostalCode/:City", saveUser);
/**
 * @swagger
 * /User/cedula:
 *  delete:
 *    summary: Delete user
 */
router.delete("/User/:id", deleteUser);

/**
 * @swagger
 * /User/cedula:
 *  put:
 *    summary: Update user
 */
router.put("/User/:id", updateUser);

router.get("/User/:Mail", getUserByMail);

router.get("/User/:Mail/:Password", authenticateUser);
export default router;
