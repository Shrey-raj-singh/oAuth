const express = require('express');
const router = express.Router();
const {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  deleteOrganization
} = require('../models/organizationModel');

// Create new organization
router.post('/', async (req, res) => {
  try {
    const { name, type, contact_email, address } = req.body;
    if (!name || !type) {
      return res.status(400).json({ error: 'name and type are required' });
    }

    const id = await createOrganization({ name, type, contact_email, address });
    res.status(201).json({ id, message: 'Organization created successfully' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all organizations
router.get('/', async (req, res) => {
  try {
    const data = await getAllOrganizations();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch organizations' });
  }
});

// Get one by ID
router.get('/:id', async (req, res) => {
  try {
    const org = await getOrganizationById(req.params.id);
    if (!org) return res.status(404).json({ error: 'Not found' });
    res.json(org);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving organization' });
  }
});

// Delete by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteOrganization(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Organization not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting organization' });
  }
});

module.exports = router;
