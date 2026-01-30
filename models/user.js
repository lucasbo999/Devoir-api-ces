const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const User = new Schema({
    name: {
        type : String,
        trim : true,
        required: [true, 'Le nom est requis'],
    },

    firstname: {
        type: String,
        trim: true,
        required: [true, 'Le prénom est requis']
    },

    email: {
        type : String,
        trim : true,
        required : [true, 'L’email est requis'],
        unique : true, 
        lowercase : true
    },

    password: {
    type: String,
    trim: true,
    minlength: 8,
    required: [true, 'Le mot de passe est requis']
    }
});

User.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', User);
