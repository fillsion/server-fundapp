import { connect } from "../database";
const {validationResult } = require('express-validator');
export const getProject = async (req, res) => {
  console.log("here at get")
  let sql = "SELECT * FROM project";
  const connection = await connect();
  const [rows] = await connection.query(sql);
  //console.log(rows);

  res.json(rows);
};

export const getSingleProject = async (req, res) => {
  let sql = "SELECT * FROM project WHERE id = ?";
  const connection = await connect();
  const [rows] = await connection.query(sql, [req.params.id]);
  res.json(rows[0]);
};
export const getProjectCount = async (req, res) => {
  let sql = "SELECT count(*) FROM project";
  const connection = await connect();
  const [rows] = await connection.query(sql);
  res.json(rows[0]["count(*)"]);
};
export const saveProject = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors);
    return res.status(400).send("wrong format");
  }
  let sql =
    "INSERT INTO project(userID, Name, Description, Scope, TentativeDate, Type, State) VALUES (?,?,?,?,?,?,?)";
  const connection = await connect();
  const result = await connection.query(sql, [
    req.body.userID,
    req.body.name,
    req.body.description,
    req.body.scope,
    req.body.tentativeDate,
    req.body.type,
    req.body.state,
  ]);
  console.log("here2register");
  const response = {res: "Project registered!", error: false};
  return res.status(200).json(response);
};
export const deleteProject = async (req, res) => {
  const connection = await connect();
  let sql = "DELETE FROM project WHERE id = ?";

  await connection.query(sql, [req.params.id]);
  res.sendStatus(204);
};
export const updateProject = async (req, res) => {
  const connection = await connect();
  let sql = "UPDATE project SET ? WHERE id = ?";
  const result = await connection.query(sql, [req.body, req.params.id]);
  res.sendStatus(204);
};

export const userProjects = async (req, res) => {
  let sql =
    "SELECT * FROM project WHERE userID = ?";
  const connection = await connect();
  const [rows] = await connection.query(sql, [req.params.userID]);
  //console.table( rows);
  res.json(rows);
};
