const db = require('../config/dbconfig');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM navmenu');
  return rows;
};

exports.create = async (menu_name, color,subMenu) => {
  const [result] = await db.query('INSERT INTO navmenu (name, stylecolor,submenu) VALUES (?, ?,?)', [menu_name, color,subMenu]);
  return result.insertId;
};


