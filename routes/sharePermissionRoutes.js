const express = require('express');
const router = express.Router();
const {
  grantAccess,
  getUsersWithAccessTo,
  hasAccess,
  revokeAccess
} = require('../models/sharePermissionModel');

// Grant access to someone
router.post('/', async (req, res) => {
  try {
    const { user_id, granted_to, granted_by, expires_at } = req.body;

    if (!user_id || !granted_to || !granted_by) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const id = await grantAccess({ user_id, granted_to, granted_by, expires_at });
    res.status(201).json({ id, message: 'Access granted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to grant access' });
  }
});

// View users who can access a patient's data
router.get('/user/:user_id', async (req, res) => {
  try {
    const list = await getUsersWithAccessTo(req.params.user_id);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch permissions' });
  }
});

// Check if user has access (API-friendly)
router.get('/check', async (req, res) => {
  try {
    const { granted_to, user_id } = req.query;
    const access = await hasAccess(granted_to, user_id);
    res.json({ hasAccess: access });
  } catch (err) {
    res.status(500).json({ error: 'Check failed' });
  }
});

// Revoke access
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await revokeAccess(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Permission not found' });
    res.json({ message: 'Access revoked' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to revoke access' });
  }
});

module.exports = router;
