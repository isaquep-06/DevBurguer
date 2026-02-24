import * as Yup from 'yup';
// import model Product
import Product from '../models/Product.js';
import Category from '../models/Category.js';

class ProductController {
  async store(req, res) {
    const data = {
      ...req.body,
      price: Number(req.body.price),
      offer: req.body.offer === "true"
    };

    const scheme = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.string().required(),
      offer: Yup.boolean().required(),
    });

    // Validation with yup
    try {
      scheme.validateSync(data, {
        abortEarly: false, // Receiver all erros = false
        strict: true, // Do not invert data = true
      });
    } catch (err) {
      return res.status(400).json({ message: err.errors });
    }

    const { name, price, category_id, offer } = req.body;

    let path;
    if (req.file) {
      path = req.file.filename;
    }

    const newProduct = await Product.create({
      name,
      price,
      category_id,
      offer,
      path: path,
    });

    res.status(200).json({ data: newProduct });
  }

  async update(req, res) {



    const scheme = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.string(),
      offer: Yup.boolean(),
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

    const { name, price, category_id, offer } = req.body;
    const { id } = req.params

    const product = await Product.findByPk(id)
    if (!product) return res.status(400).json({
      message: "Produto não encontrado!"
    })

    let path;
    if (req.file) {
      path = req.file.filename;
    }

    await Product.update({
      name,
      price,
      category_id,
      offer,
      path: path,
    },
      {
        where: {
          id: id
        }
      });

    return res.status(200).json({
      message: "Atualizado!"
    });

  }

  async index(_req, res) {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
    });

    const userId = _req.userId;
    console.log(userId);
    return res.status(200).json({ products });
  }
}

export default new ProductController();
