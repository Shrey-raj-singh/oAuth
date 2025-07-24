const db = require('../config/db');

async function findUserByEmail(email) {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

async function createUser(user) {
  const [result] = await db.query(
    `INSERT INTO users (created_by, email, password_hash, role, name, dob, gender, blood_group, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      user.created_by,
      user.email,
      user.password_hash,
      user.role,
      user.name,
      user.dob,
      user.gender,
      user.blood_group,
    ]
  );
  return result.insertId;
}

module.exports = { findUserByEmail, createUser };
