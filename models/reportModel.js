const db = require('../config/db');

// Create a health report
async function createReport({ user_id, uploaded_by, hospital_id, report_type, description }) {
  const [res] = await db.query(
    `INSERT INTO reports (user_id, uploaded_by, hospital_id, report_type, description)
     VALUES (?, ?, ?, ?, ?)`,
    [user_id, uploaded_by, hospital_id || null, report_type, description]
  );
  return res.insertId;
}

// Get reports for a specific user
async function getReportsByUser(user_id) {
  const [rows] = await db.query(
    `SELECT r.*, u.name AS uploaded_by_name, o.name AS hospital_name
     FROM reports r
     LEFT JOIN users u ON r.uploaded_by = u.id
     LEFT JOIN organizations o ON r.hospital_id = o.id
     WHERE r.user_id = ?
     ORDER BY r.created_at DESC`,
    [user_id]
  );
  return rows;
}

// Get a specific report by ID
async function getReportById(id) {
  const [rows] = await db.query(
    `SELECT * FROM reports WHERE id = ?`,
    [id]
  );
  return rows[0];
}

// Delete a report
async function deleteReport(id) {
  const [res] = await db.query(
    `DELETE FROM reports WHERE id = ?`,
    [id]
  );
  return res.affectedRows > 0;
}

module.exports = {
  createReport,
  getReportsByUser,
  getReportById,
  deleteReport
};
