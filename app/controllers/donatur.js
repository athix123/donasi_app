const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Donatur = mongoose.model('Donatur');


module.exports = (app) => {
  app.use('/', router);
};

router.get('/v1/donatur', (req, res) => {
	Donatur.find().exec()
	.then(data => {
		res.status(200).json({
			result: data
		})
	})
	.catch(err => {
		res.status(500).send(err);
	})

})

router.get('/v1/donatur/:id', (req, res) => {
	Donatur.findById(req.params.id).exec()
	.then(data => {
		if(data == null) {
			res.status(404).json({
				message: 'Donatur not found!',
			})
		} else {
			res.status(200).json({
				message: 'Get Donatur by id Success!',
				result: data
			})
		}
	})
	.catch(err => {
		res.status(500).send(err);
	})
})

router.post('/v1/donatur', (req, res) => {
	var body = req.body;

	Donatur.create({
		"id_unique": body.id_unique, /* sementara manual, harusnya fungsi ada fungsi generate*/
		"nama": body.nama,
		"email": body.email,
		"password": body.password,
		"gender": body.gender,
		"tanggal_lahir": body.tanggal_lahir,
		"alamat_lengkap": body.alamat,
		// "token": body.token, /*sek, lali flow token*/
		"akun_bank": body.akun_bank
	}, (err, donatur) => {
		if(err) {
			return handleError(err);
		} else {
			res.status(200).json({
					message: 'Donatur '+ body.nama +' Created'
			});
		}
	});
});

router.put('/v1/donatur/:id', (req, res) => {
	var newData = req.body;

	Donatur.findById(req.params.id)
	.then(data => {
		if(data == null) {
			res.status(404).json({
				message: 'Donatur not found!',
			})
		} else {
			Donatur.updateOne({_id: data._id}, newData, (err, cb) => {
				res.status(200).json({
					message: 'Donatur '+ data.nama +' edited',
					result: data
				})
			})
		}
	})
	.catch(err => {
		res.status(500).send(err);
	})
});

router.delete('/v1/donatur/:id', (req, res) => {
	Donatur.findById(req.params.id)
	.then(data => {
		if(data == null) {
			res.status(404).json({
				message: 'Donatur not found!',
			})
		} else {
			Donatur.deleteOne({_id: data._id}, (err, donatur) => {
				res.status(200).json({
					message: 'Donatur deleted'
				})
			})
		}
	})
	.catch(err => {
		res.status(500).send(err);
	})
});