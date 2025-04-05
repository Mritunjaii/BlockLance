const User = require('../models/user.model');

exports.createUser = async (username, email, password, walletAddress, role) => {
  const existingUser = await User.findOne({ $or: [{ email }, { walletAddress }] });
  if (existingUser) {
    throw new Error('Email or wallet address already in use');
  }
  
  const user = new User({
    username,
    email,
    password,
    walletAddress,
    role
  });
  
  await user.save();
  return user;
};

exports.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid login credentials');
  }
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid login credentials');
  }
  
  return user;
};