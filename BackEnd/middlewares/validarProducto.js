import { check, validationResult } from "express-validator";

export const validarProducto = [
  check("nombre").optional()
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 2 }).withMessage("El nombre debe tener al menos 2 caracteres"),
  
  check("categoria").optional()
    .notEmpty().withMessage("La categoria es obligatoria"),
  
  check("precio").optional()
    .isNumeric().withMessage("El precio debe ser un numero")
    .custom(value => value >= 0).withMessage("El precio debe ser mayor o igual a 0"),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      console.log("Errores de validación:", errores.array());
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];
