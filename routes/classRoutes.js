const express = require('express');
const router = express.Router();
const {
  createClass,
  getClassesBySchool,
  createSection,
  getSectionsByClass,
} = require('../models/classModel');

// Create a class under a school
router.post('/class', async (req, res) => {
  try {
    const { name, school_id } = req.body;
    if (!name || !school_id) return res.status(400).json({ error: 'Missing fields' });

    const id = await createClass(name, school_id);
    res.status(201).json({ id, message: 'Class created' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating class' });
  }
});

// Get classes for a school
router.get('/class/:school_id', async (req, res) => {
  try {
    const data = await getClassesBySchool(req.params.school_id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching classes' });
  }
});

// Create a section under a class
router.post('/section', async (req, res) => {
  try {
    const { name, class_id } = req.body;
    if (!name || !class_id) return res.status(400).json({ error: 'Missing fields' });

    const id = await createSection(name, class_id);
    res.status(201).json({ id, message: 'Section created' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating section' });
  }
});

// Get sections for a class
router.get('/section/:class_id', async (req, res) => {
  try {
    const data = await getSectionsByClass(req.params.class_id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching sections' });
  }
});

module.exports = router;
