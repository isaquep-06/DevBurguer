import { v4 } from 'uuid';
import User from '../models/User.js';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';

class UserController {
  async store(req, res) {
    // structuring data
    const scheme = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean(),
    });

    try {
      scheme.validateSync(req.body, {
        abortEarly: false, // Receiver all erros = false
        strict: true, // Do not invert data = true
      });
    } catch (err) {
      return res.status(400).json({ message: err.errors });
    }

    // destructuring json, coming from the body
    const { name, email, password, admin } = req.body;

    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // creating a password with bcrypt
    const password_hash = await bcrypt.hash(password, 10);

    // Creating user
    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash, // Sending a hashed password
      admin,
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    });
  }
}

export default new UserController();
