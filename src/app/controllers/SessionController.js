const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user = {
  id: 1,
  email: 'johndoe@gmail.com',
  name: 'John Doe',
  password: '123456',
};

const comparePassword = async (password) => {
  const hashedPassword = await bcrypt.hash(user.password, 8);

  const compareHash = await bcrypt.compare(password, hashedPassword);

  return compareHash;
};

const generateToken = () => {
  return jwt.sign({
    id: user.id,
  }, process.env.APP_SECRET);
};

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    if (email !== user.email) {
      return res.status(404).json({ message: 'User not found' });
    }

    const checkPassword = await comparePassword(password);

    if (!checkPassword) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(),
    });
  }
}

module.exports = new SessionController();
