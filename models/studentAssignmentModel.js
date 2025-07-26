const db = require('../config/db');

// Assign student to a section
async function assignStudent(student_id, section_id, assigned_by) {
  const [res] = await db.query(
    `INSERT INTO student_assignments (student_id, section_id, assigned_by)
     VALUES (?, ?, ?)`,
    [student_id, section_id, assigned_by]
  );
  return res.insertId;
}

// Get all students in a section
async function getStudentsBySection(section_id) {
  const [rows] = await db.query(
    `SELECT sa.id, u.id as student_id, u.name, u.email
     FROM student_assignments sa
     JOIN users u ON sa.student_id = u.id
     WHERE sa.section_id = ?`,
    [section_id]
  );
  return rows;
}

// Get all assignments of a student
async function getSectionsByStudent(student_id) {
  const [rows] = await db.query(
    `SELECT sa.id, cs.name AS section_name, sc.name AS class_name
     FROM student_assignments sa
     JOIN class_sections cs ON sa.section_id = cs.id
     JOIN school_classes sc ON cs.class_id = sc.id
     WHERE sa.student_id = ?`,
    [student_id]
  );
  return rows;
}

module.exports = {
  assignStudent,
  getStudentsBySection,
  getSectionsByStudent
};
