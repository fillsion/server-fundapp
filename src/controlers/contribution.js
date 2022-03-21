import { connect } from "../database";
const {validationResult } = require('express-validator');
const validator = require("./validator");
var uuid = require('uuid');

export const saveContribution = async (req, res) => {
  console.log(req.body);
  const amount = parseFloat(req.body.amount.number)
  let aproved = 0;
  if (amount > 0){
    aproved = 1;
  }
  let pasarelaDePagosID = uuid.v1();
    console.log(pasarelaDePagosID);
    let sql = "INSERT INTO contribution(id, userID, projectID, amount, type, aproved) VALUES (?,?,?,?,?,?)";
    const connection = await connect();
    await connection.query(sql, [
    pasarelaDePagosID,
    req.body.userID,
    req.body.projectID,
    amount,
    req.body.type,
    aproved,
  ]);
  if(aproved){
    console.log("saving contribution");
    const response = {res: "Contribution succesfully",id:pasarelaDePagosID, amount: amount,error: false};
    return res.status(200).json(response);
  }
      const response = {res: "Contribution failed",id:pasarelaDePagosID,amount: amount,error: true};
      return res.status(200).json(response);
  
} 

export const getProjectContributions = async (req, res) => {
  let sql =
    "SELECT type, SUM(amount) AS amount FROM contribution WHERE projectID = ? AND aproved = 1 GROUP BY type;";
  const connection = await connect();
  const [rows] = await connection.query(sql, [req.params.id]);
  //console.table( rows);
  
  if (rows.length>0){
    let result = {res: rows, error: false};
    return res.status(200).json(result);
  } else{
    let result = {res: rows, error: true};
    return res.status(200).json(result);
  }
  
};



