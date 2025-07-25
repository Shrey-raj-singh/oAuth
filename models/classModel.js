const db = require('../config/db');

// School Classes
async function createClass(name, school_id) {
  const [res] = await db.query(
    'INSERT INTO school_classes (name, school_id) VALUES (?, ?)',
    [name, school_id]
  );
  return res.insertId;
}

async function getClassesBySchool(school_id) {
  const [rows] = await db.query(
    'SELECT * FROM school_classes WHERE school_id = ?',
    [school_id]
  );
  return rows;
}

// Class Sections
async function createSection(name, class_id) {
  const [res] = await db.query(
    'INSERT INTO class_sections (name, class_id) VALUES (?, ?)',
    [name, class_id]
  );
  return res.insertId;
}

async function getSectionsByClass(class_id) {
  const [rows] = await db.query(
    'SELECT * FROM class_sections WHERE class_id = ?',
    [class_id]
  );
  return rows;
}

module.exports = {
  createClass,
  getClassesBySchool,
  createSection,
  getSectionsByClass,
};
