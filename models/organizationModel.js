const db = require('../config/db');

async function createOrganization(org) {
  const [result] = await db.query(
    `INSERT INTO organizations (name, type, contact_email, address)
     VALUES (?, ?, ?, ?)`,
    [org.name, org.type, org.contact_email, org.address]
  );
  return result.insertId;
}

async function getAllOrganizations() {
  const [rows] = await db.query('SELECT * FROM organizations');
  return rows;
}

async function getOrganizationById(id) {
  const [rows] = await db.query('SELECT * FROM organizations WHERE id = ?', [id]);
  return rows[0];
}

async function deleteOrganization(id) {
  const [result] = await db.query('DELETE FROM organizations WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  deleteOrganization
};
