const db = require('../config/dbconfig');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM contents');
  return rows;
};

exports.create = async (heading, content,image_src) => {
  const [result] = await db.query('INSERT INTO contents (heading, content,image_src) VALUES (?, ?,?)', [heading, content,image_src]);
  return result.insertId;
};


