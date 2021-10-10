const router = require('express').Router();

const {User} = require('../../models');

// GET /API/USERS-READ
router.get('/',(req,res)=>{
  User.findAll({
    // attributes: {exclude: ['password']}
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err =>{
    res.status(500).json(err);
  });

});

// GET /API/USER1-READ

router.get('/:id',(req,res)=>{
  User.findOne({
    attributes: {exclude: ['password']},
   where: {
     id: req.params.id
   } 
  })
  .then(dbUserData =>{
    if(!dbUserData){
      res.status(404).json({message:'No user found with this id'});
      return;
    }
    res.json(dbUserData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  })
});

// POST/API/USER-CREATE
router.post('/',(req,res)=>{
  User.create({
    username: req.body.username,
    email:req.body.email,
    password:req.body.password
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});
// login user

router.post('/login', (req,res)=>{
  // query operation
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData =>{
    if(!dbUserData){
      res.status(400).json({message:'No user found with this email adress!'});
      return;
    }
      const validPassword = dbUserData.checkPassword(req.body.password);
      if(!validPassword){
        res.status(400).json({message: 'Incorrect password!'});
        return;
      }
    
    res.json({user: dbUserData, message: 'You are now logged in!'});
  });
});
// PUT/API/USERS/1-UPDATE
router.put('/:id',(req,res)=>{
  User.update(req.body,{
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData =>{
    if(!dbUserData[0]){
      res.status(404).json({message: 'No user found with this id'});
      return;
    }
    res.json(dbUserData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

// DELETE /API/USER1-DELETE
router.delete('/:id',(req,res)=>{
  User.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(dbUserData =>{
    if(!dbUserData){
      res.status(404).json({message: 'No user found with this id'});
      return;
    }
    res.json(dbUserData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  })
});


module.exports = router;