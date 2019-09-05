const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const News = mongoose.model('News');


module.exports = (app) => {
  app.use('/', router);
};

router.get('/v1/news', (req, res) => {
	News.find().exec()
	.then(data => {
		res.status(200).json({
			result: data
		});
	})
	.catch(err => {
		res.status(500).send(err);
	});
});

router.get('/v1/news/:id', (req, res) => {
	News.findById(req.params.id).exec()
	.then(data => {
		if(data == null) {
			res.status(404).json({
				message: 'News not found!',
			});
		} else {
			res.status(200).json({
				message: 'Get News by id Success!',
				result: data
			});
		}
	})
	.catch(err => {
		res.status(500).send(err);
	});
});

router.post('/v1/news', (req, res) => {
	var body = req.body;

	News.create({
		"judul": body.judul, /* sementara manual, harusnya fungsi ada fungsi generate*/
		"deskripsi": body.deskripsi,
		"gambar": body.gambar,
	}, (err, news) => {
		if(err) {
			return handleError(err);
		} else {
			res.status(200).json({
					message: 'News '+ body.judul +' Created'
			});
		}
	});
});

router.put('/v1/news/:id', (req, res) => {
	var newData = req.body;

	News.findById(req.params.id)
	.then(data => {
		if(data == null) {
			res.status(404).json({
				message: 'News not found!',
			});
		} else {
			News.updateOne({_id: data._id}, newData, (err, cb) => {
				res.status(200).json({
					message: 'News '+ data.judul +' edited',
					result: data
				})
			});
		}
	})
	.catch(err => {
		res.status(500).send(err);
	});
});

router.delete('/v1/news/:id', (req, res) => {
	News.findById(req.params.id)
	.then(data => {
		if(data == null) {
			res.status(404).json({
				message: 'News not found!',
			})
		} else {
			News.deleteOne({_id: data._id}, (err, news) => {
				res.status(200).json({
					message: 'News ' + data.judul + ' deleted'
				})
			});
		}
	})
	.catch(err => {
		res.status(500).send(err);
	});
});