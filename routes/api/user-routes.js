const router = require('express').Router();

const {User} = require('../../models');

// GET /API/USERS-READ
router.get('/',(req,res)=>{});

// GET /API/USER1-READ

router.get('/:id',(req,res)=>{});

// POST/API/USER-CREATE
router.post('/',(req,res)=>{});

// PUT/API/USERS/1-UPDATE
router.put('/:id',(req,res)=>{});

// DELETE /API/USER1-DELETE
router.delete('/:id',(req,res)=>{});


module.exports = router;