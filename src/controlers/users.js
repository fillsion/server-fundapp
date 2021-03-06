import { connect } from "../database";
import  Axios  from "axios";
const { validationResult } = require("express-validator");
const validator = require("./validator");
export const getUser = async (req, res) => {
  let sql = "SELECT * FROM user";
  const connection = await connect();
  const [rows] = await connection.query(sql);
  console.log(rows);

  res.json(rows);
};

export const getSingleUser = async (req, res) => {
  let sql = "SELECT Name, Surname, Mail, Phone, City FROM user WHERE id = ?";
  console.log("i am here in single user by id");
  const connection = await connect();
  const [rows] = await connection.query(sql, [req.params.id]);
  res.json(rows[0]);
};
export const getUserCount = async (req, res) => {
  let sql = "SELECT count(*) FROM user";
  const connection = await connect();
  const [rows] = await connection.query(sql);
  res.json(rows[0]["count(*)"]);
};
export const saveUser = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const response = {
      res: errors.array()[0]["param"] + " field has the wrong format",
      error: true,
    };
    return res.status(400).send(response);
  }
  if (req.body.verifyPassword != req.body.password) {
    console.log("here3register");
    const response = {
      res: "password not the same as verify password",
      error: true,
    };
    return res.status(400).json(response);
  }

  //handle errors
  // const valid = new validator(req);

  // if (!valid.validate()){
  //   console.log("no cumplio con algo");
  //   return;
  // }
  let sql =
    "INSERT INTO user(Mail, Password, Name, Surname, Phone, PostalCode, City) VALUES (?,aes_encrypt(?, 'secretyKey'),?,?,?,?,?)";
  const connection = await connect();
  let user = [
    req.body.mail,
    req.body.password,
    req.body.name,
    req.body.surname,
    req.body.phone,
    req.body.postalCode,
    req.body.city,
  ];
  const result = await connection.query(sql, user, function(err, result){
    console.log("user Idddddddddddddddddddddddddddddddddd:- " + result.insertId)
  });
  console.log("here2register", result);
  const response = { res: "User registered!", userID: result[0].insertId, error: false };
  return res.status(200).json(response);
};
export const deleteUser = async (req, res) => {
  const connection = await connect();
  let sql = "DELETE FROM user WHERE id = ?";
  await connection.query(sql, [req.params.id]);
  res.sendStatus(204);
};
export const updateUser = async (req, res) => {
  const connection = await connect();
  let sql = "UPDATE user SET ? WHERE id = ?";
  const result = await connection.query(sql, [req.body, req.params.id]);
  res.sendStatus(204);
};

export const getUserByMail = async (req, res) => {
  let sql = "SELECT * FROM user WHERE Mail = ?";
  const connection = await connect();
  const [rows] = await connection.query(sql, [req.params.Mail]);
  res.json(rows[0]);
};

export const authenticateUser = async (req, res) => {
  if (req.params.Mail == ""|| req.params.Password == ""){
    const result = { res: "User not found", error: true };
    return res.status(400).json(result);
  }
  let sql = "SELECT id, Name FROM user WHERE Mail = ? AND Password = aes_encrypt(?, 'secretyKey');";
  const connection = await connect();
  console.log("authenticatinc user")
  const [rows] = await connection.query(sql, [
    req.params.Mail,
    req.params.Password,
  ]);

  if (rows.length === 0) {
    const result = { res: "User not found", error: true };
    console.log("returning here");
    return res.status(400).json(result);
  }
  console.log(rows[0]);
  const result = { res: rows[0], error: false };
  console.log(result);
  return res.status(200).json(result);
};
