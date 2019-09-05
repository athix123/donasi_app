const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonasiSchema = new Schema({
	jenis_donasi: String,
	
});

DonasiSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Donasi', DonasiSchema);