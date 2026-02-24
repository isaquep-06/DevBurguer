import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

class SessionController {
  async store(req, res) {
    const scheme = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const isValidUser = await scheme.isValid(req.body, {
      abortEarly: false,
      strict: true,
    });

    const EmailOrPasswordIncorrect = () => {
      // Array function, for save code
      return res.status(400).json({ error: 'Email or Password incorrect' });
    };

    // Conditional
    if (!isValidUser) {
      return EmailOrPasswordIncorrect(); // Call functions for response
    }

    const { id, email, password, admin } = req.body;

    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return EmailOrPasswordIncorrect();
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password_hash,
    );

    if (!isPasswordCorrect) {
      return EmailOrPasswordIncorrect();
    }

    const token = jwt.sign(
      { id: existingUser.id, admin: existingUser.admin }, // Saving data in JWT
      authConfig.secret,
      {
        // Secret word
        expiresIn: authConfig.expiresIn, // Expiration token
      },
    );

    req.isUserAdmin = existingUser.admin;

    console.log(req.isUserAdmin);
    return res.status(200).json({
      message: `Bem vindo ${existingUser.name}`,
      token: token,
      admin: admin,
    }); // if everything is correct
  }
}

export default new SessionController();
