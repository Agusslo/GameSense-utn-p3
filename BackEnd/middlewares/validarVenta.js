import { check, body, validationResult } from "express-validator";

export const validarVenta = [
  check("usuario").notEmpty().withMessage("nombre del usuario es obligatorio"),
  
  check("productos").isArray({ min: 1 }).withMessage("Debe haber al menos un producto en la venta"),

  // uso body porque productos es un array de objetos
  body("productos.*.producto").notEmpty().withMessage("Cada producto debe tener un ID valido"),

  body("productos.*.cantidad").isInt({ min: 1 }).withMessage("La cantidad debe ser al menos 1"),

  check("total").isNumeric().withMessage("El total debe ser un numero"),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];
