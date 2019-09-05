const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
	judul: String,
	deskripsi: String,
	tanggal_post: {
		type: Date,
		default: Date.now
	},
	gambar: String
});

NewsSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('News', NewsSchema);