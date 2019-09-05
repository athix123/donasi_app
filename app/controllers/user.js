const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const saltRounds = 10;
const bcrypt = require('bcryptjs');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/users', (req, res, next) => {
	//hidden super duper user for security
	User.find({role: { $ne: 99 }}).exec((err, data) => {
		// console.log('Get all employee')
		res.json(data)
	})
});

router.get('/user/:id', (req, res) => {
	var id = req.params.id;

	res.status(200).json({
		message: 'Get user by id Ready!',
		result: id
	})
});

router.get('/user/u/:username', (req, res) => {
	var username = req.params.username;

	res.status(200).json({
		message: 'Get user by username Ready!',
		result: username
	})
});

router.post('/user', (req, res, next) => {
	var user = {
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		role: req.body.role,
		push_token: body.push_token,
	};
	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
		user.password = hash;
		console.log(hash)
		newData = new User(user);
		checkUsernameEmailExist(req.body.username, req.body.email, (cb)=>{
			if (cb) {
				newData.save((err,data)=>{
					res.status(200).json({
						message: 'User Created',
						data: data
					})		
				})
			} else {
				res.status(409).json({
					message: "User Exist"
				})
			}
		})
		
	});
});

// router.delete('/user/:id', (req,res,next)=>{
// 	User.findById(req.params.id, (err,data)=>{
		
// 		User.deleteOne({_id:data._id}, (err,data)=>{
// 			res.json(data);	
// 		})
// 	})
// })



router.put('/user/:id', (req, res, next) => {
	res.status(200).json({
		message: 'Update user by id READY!'
	})
});



function checkUsernameEmailExist(username, email, cb){
	User.findOne({username: username}, (err, data)=>{
		if (err) {

		} else {
			if (data) {
				cb(false)
			} else {
				User.findOne({email: email}, (err, data)=>{
					if (err) {

					} else {
						if (data) {
							cb(false)
						} else {
							cb(true)
						}
					}
				})
			}
		}
	})
}

