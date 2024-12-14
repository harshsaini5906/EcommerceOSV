import Joi from "joi"

export const productSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'product name must be a string',
    'any.required': "product name is required"
  }),
  stock: Joi.number().min(0).required().messages({
    'number.base': 'stock must be a number',
    'number.min': 'stock cannot be negative',
    'any.required': 'stock is required'
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price cannot be negative',
    'any.required': 'Price is required'
  })
});


export const vendorSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'name must be a string',
    'any.required': 'name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'email must be a string',
    'string.email': 'email must be a valid email',
    'any.required': 'email is required'
  }),
  password: Joi.string().min(4).required().messages({
    'string.base': 'Password must be a string',
    'string.min': 'Password must be at least 4 characters long',
    'any.required': 'password is required'
  })
});



export const orderSchema = Joi.object({
    vendorId: Joi.string().required().messages({
      'string.base': 'vendor must be a string',
      'any.required': 'vendorId is required'
    }),
    productId: Joi.string().required().messages({
      'string.base': 'productId must be a string',
      'any.required': 'productId is required'
    }),
  });
  


export const joiValidator = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ error: error.details.map(e => e.message) });
      }
      next();
    };
  };
  