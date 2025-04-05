const User = require('../models/user.model');
const { generateToken } = require('../services/auth.service');
const { createUser } = require('../services/auth.service');

exports.register = async (req, res) => {
  try {
    const { username, email, password, walletAddress, role } = req.body;
    const user = await createUser(username, email, password, walletAddress, role);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save();
    res.send({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.me = async (req, res) => {
  res.send(req.user);
};