import Yup, { number, string } from 'yup'
// Models and Schemas
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Order from '../schemas/Order.js';

class OrderController {
  async store(req, res) {

    const scheme = Yup.object({
      products: Yup.array().required().of(
        Yup.object({
          id: number().required(),
          quantity: number().required()
        })
      )
    })

    try {
      scheme.validateSync(req.body, {
        abortEarly: false, // Receiver all erros = false
        strict: true, // Do not invert data = true
      });
    } catch (err) {
      return res.status(400).json({ message: err.errors });
    }


    const { userId, userName } = req
    const { products } = req.body
    // products = [ {id, quantity}, {id, quatity}, ...]
    const productsIds = products.map(product => product.id)

    const findProducts = await Product.findAll({
      where: {
        id: productsIds
      },
      include: {
        model: Category,
        as: 'category',
        attributes: ['name']
      }
    })

    const mapedProducts = findProducts.map(product => {
      const quantity = products.find(p => p.id === product.id).quantity

      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        url: product.url,
        category: product.category.name,
        quantity
      }

      return newProduct;
    })


    const order = {
      user: {
        id: userId,
        name: userName
      },
      products: mapedProducts,
      status: "Pedido realizado!"
    }

    const newOrder = await Order.create(order)

    return res.status(200).json(newOrder)
  }

  async update(req, res) {
    const scheme = Yup.object({
      status: Yup.string().required()
    })

    try {
      scheme.validateSync(req.body, {
        abortEarly: false, // Receiver all erros = false
        strict: true, // Do not invert data = true
      });
    } catch (err) {
      return res.status(400).json({ message: err.errors });
    }

    const { status } = req.body
    const { id } = req.params

    try {
      await Order.updateOne({ _id: id }, { status })
    } catch (err) {
      return res.status(400).json({ err: err.message })
    }
    return res.status(200).json({
      Status: status,
      message: "Enviado com sucesso"
    })
  }

  async index(_req, res) {
    try {
      const getAllOrders = await Order.find()
      return res.status(200).json(getAllOrders)
    } catch (err) {
      return res.status(400).json(err)
    }
  }
}

export default new OrderController();