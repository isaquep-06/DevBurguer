import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';
import e from 'express';

class SessionController {
  async store(req, res) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });


    const isValid = await schema.isValid(req.body);

    if (!isValid) {
      return res.status(400).json({ error: "Email or Password incorrect" });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "Email or Password incorrect" });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(400).json({ error: "Email or Password incorrect" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        admin: user.admin,
        name: user.name
      },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn
      }
    );

    return res.json({
      name: `${user.name}`,
      token,
      admin: user.admin
    });
  }
}

export default new SessionController();

