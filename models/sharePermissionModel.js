const db = require('../config/db');

// Grant permission
async function grantAccess({ user_id, granted_to, granted_by, expires_at }) {
  const [res] = await db.query(
    `INSERT INTO share_permissions (user_id, granted_to, granted_by, expires_at)
     VALUES (?, ?, ?, ?)`,
    [user_id, granted_to, granted_by, expires_at || null]
  );
  return res.insertId;
}

// Get users who can access this patient's data
async function getUsersWithAccessTo(user_id) {
  const [rows] = await db.query(
    `SELECT sp.*, u.name AS granted_to_name
     FROM share_permissions sp
     JOIN users u ON sp.granted_to = u.id
     WHERE sp.user_id = ? AND (sp.expires_at IS NULL OR sp.expires_at > NOW())`,
    [user_id]
  );
  return rows;
}

// Check if a user has access to another's data
async function hasAccess(granted_to, user_id) {
  const [rows] = await db.query(
    `SELECT * FROM share_permissions
     WHERE granted_to = ? AND user_id = ? AND (expires_at IS NULL OR expires_at > NOW())`,
    [granted_to, user_id]
  );
  return rows.length > 0;
}

// Revoke access
async function revokeAccess(permission_id) {
  const [res] = await db.query(
    `DELETE FROM share_permissions WHERE id = ?`,
    [permission_id]
  );
  return res.affectedRows > 0;
}

module.exports = {
  grantAccess,
  getUsersWithAccessTo,
  hasAccess,
  revokeAccess
};
