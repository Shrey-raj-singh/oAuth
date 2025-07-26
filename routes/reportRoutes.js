const express = require('express');
const router = express.Router();
const {
  createReport,
  getReportsByUser,
  getReportById,
  deleteReport
} = require('../models/reportModel');

// Create new report
router.post('/', async (req, res) => {
  try {
    const { user_id, uploaded_by, hospital_id, report_type, description } = req.body;

    if (!user_id || !uploaded_by || !report_type) {
      return res.status(400).json({ error: 'user_id, uploaded_by, and report_type are required' });
    }

    const id = await createReport({ user_id, uploaded_by, hospital_id, report_type, description });
    res.status(201).json({ id, message: 'Report uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload report' });
  }
});

// Get all reports for a user
router.get('/user/:user_id', async (req, res) => {
  try {
    const reports = await getReportsByUser(req.params.user_id);
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// Get single report by ID
router.get('/:id', async (req, res) => {
  try {
    const report = await getReportById(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch report' });
  }
});

// Delete report by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteReport(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Report not found' });
    res.json({ message: 'Report deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete report' });
  }
});

module.exports = router;
