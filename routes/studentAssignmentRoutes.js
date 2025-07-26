const express = require('express');
const router = express.Router();
const {
  assignStudent,
  getStudentsBySection,
  getSectionsByStudent
} = require('../models/studentAssignmentModel');

// Assign a student to a section
router.post('/', async (req, res) => {
  try {
    const { student_id, section_id, assigned_by } = req.body;
    if (!student_id || !section_id || !assigned_by)
      return res.status(400).json({ error: 'Missing required fields' });

    const id = await assignStudent(student_id, section_id, assigned_by);
    res.status(201).json({ id, message: 'Student assigned successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to assign student' });
  }
});

// Get students by section
router.get('/section/:section_id', async (req, res) => {
  try {
    const students = await getStudentsBySection(req.params.section_id);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve students' });
  }
});

// Get assigned sections by student
router.get('/student/:student_id', async (req, res) => {
  try {
    const assignments = await getSectionsByStudent(req.params.student_id);
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve assignments' });
  }
});

module.exports = router;
