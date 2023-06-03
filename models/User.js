const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    minLength: [3, 'username must be at least 3 characters long'],
    required: true,
  },
  hashedPassword: { type: String, required: true },
  roles: {
    type: [{ type: String, enum: ['user', 'admin'] }], 
    default: ['user'],
  },
});

userSchema.index(
  { username: 1 },
  {
    unique: true,
    collation: {
      locale: 'en',
      strength: 2,
    },
  }
);

const User = model('User', userSchema);

module.exports = User;
