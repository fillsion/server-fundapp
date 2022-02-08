import { connect } from "../database";
export const getProject = async (req, res) => {
  console.log("here at get")
  let sql = "SELECT * FROM project";
  const connection = await connect();
  const [rows] = await connection.query(sql);
  console.log(rows);

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
  let sql =
    "INSERT INTO project(userID, Name, Description, Scope, TentativeDate, Type, State) VALUES (?,?,?,?,?,?)";
  const connection = await connect();
  const result = await connection.query(sql, [
    req.body.userID,
    req.body.Name,
    req.body.Description,
    req.body.Scope,
    req.body.TentativeDate,
    req.body.Type,
    req.body.State,
  ]);
  console.log(result);
  res.json({
    id: result.id,
    ...req.body,
  });
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
