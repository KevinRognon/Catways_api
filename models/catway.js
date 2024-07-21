

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Catway = new Schema({
	catwayNumber: {
		type        : Number,
		required    : [true, 'Une numéro de catway est requis']
	},
	catwayType: {
		type        : String,
		trim        : true,
		required    : [true, "Le type de catway est requis"],
		enum        : {
			values  : ['long', 'short'],
			message : 'Le type de catway doit être soit "long", soit "short"'
		}
	},
	catwayState: {
		type        : String,
		trim        : true,
		required    : ['true', "L'état du catway est requis"]
	},
	reserved: {
		type        : Boolean,
		default     : false
	}
}, {
	timestamps      : true
});


module.exports = mongoose.model('Catway', Catway);