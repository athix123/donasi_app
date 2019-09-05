const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonaturSchema = new Schema({
	id_unique: String,
	nama: { type: String, default: null },
	email: { type: String, default: null },
	password: { type: String, default: null },
	gender: {type: String, default: null},
	tanggal_lahir: {type: Date, default: null},
	alamat_lengkap: {
		alamat: String,
		kota: String,
		provinsi: String,
	},
	token: {type: String, default: null},
	id_donasi: {
		type: Schema.Types.ObjectId, 
		ref: 'Donasi'
	},
	status: {type: Number, default: 1},
	akun_bank: {
		nama_bank: String,
		nomor_rekening: String,
		atas_nama: String,
	}
});

DonaturSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Donatur', DonaturSchema);