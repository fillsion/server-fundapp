import { connect } from "../database";
import {validator} from "./validator";
export const getUser = async (req, res) => {
  let sql = "SELECT * FROM user";
  const connection = await connect();
  const [rows] = await connection.query(sql);
  console.log(rows);

  res.json(rows);
};

export const getSingleUser = async (req, res) => {
  let sql = "SELECT * FROM user WHERE id = ?";
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
  if (req.body.PerifyPassword == req.body.Password){
  let sql = "INSERT INTO user(Mail, Password, Name, Surname, Phone, PostalCode, City) VALUES (?,?,?,?,?,?,?)";
  //handle errors
  if (!validator(req).validate()){
    console.log("no cumplio con algo");
    return;
  }
  const connection = await connect();
  const result = await connection.query(sql, [
    req.params.Mail,
    req.params.Password,
    req.params.Name,
    req.params.Surname,
    req.params.Phone,
    req.params.PostalCode,
    req.params.City,
  ]);
  if (result.length===0){
    console.log("hereregister");
    const response = {res: "Couln't register account", error:true};
    return res.status(401).json(result);
    
  }
  console.log("here2register");
  const response = {res: "User registered!", error: false};
  return res.status(200).json(result);
  res.json({
    id: result.id,
    ...req.body,
  });
} else{
  console.log("here3register");
  const response = {res: "password not the same as verify password",error:true};
  return res.status(400).json(response)
}
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
  let sql = "SELECT id, Name FROM user WHERE Mail = ? AND Password = ?";
  const connection = await connect();
  const [rows] = await connection.query(sql, [req.params.Mail, req.params.Password]);
  
  if (rows.length===0){
    const result = {res: "User not found", error:true};
    return res.status(401).json(result);
  }
  const result = {res: rows[0], error: false};
  return res.status(200).json(result);
};

