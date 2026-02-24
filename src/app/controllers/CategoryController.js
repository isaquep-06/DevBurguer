import * as Yup from 'yup';
// import model Category
import Category from '../models/Category.js';

class CategoryController {
  async store(req, res) {
    const scheme = Yup.object({
      name: Yup.string().required(),
    });

    // Validation with yup
    try {
      scheme.validateSync(req.body, {
        abortEarly: false, // Receiver all erros = false
        strict: true, // Do not invert data = true
      });
    } catch (err) {
      return res.status(400).json({ message: err.errors });
    }

    const { name } = req.body;

    let path;
    if (req.file) {
      path = req.file.filename;
    }

    const existingCategory = await Category.findOne({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return res.status(401).json({ message: 'Category already exists' });
    }

    const newCategory = await Category.create({
      name,
      path: path
    });



    res.status(200).json({ data: newCategory });
  }

  async index(_req, res) {
    const categories = await Category.findAll();

    return res.status(200).json({ categories });
  }
}

export default new CategoryController();
