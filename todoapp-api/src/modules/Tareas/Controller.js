import { Tareas } from "./Model.js";

/**
 * @description Get all Tareass
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const index = async (req, res, next) => {
  try {
    //#swagger.tags = ['Tareas']
    //#swagger.description = 'Obtiene todos los tareas activos.'

    const tareas = await Tareas.findAll();
    res.status(200).json(tareas);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get a single Tareas
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const show = async (req, res, next) => {
  try {
    //#swagger.tags = ['Tareas']
    //#swagger.description = 'Obtiene un tarea por id.'

    const tarea = await Tareas.findByPk(req.params.id);
    if (!tarea) {
      throw { status: 404, message: "tarea not found" };
    }
    res.status(200).json(tarea);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Create a new Tareas
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const store = async (req, res, next) => {
  try {
    //#swagger.tags = ['Tareas']
    //#swagger.description = 'Crea un nuevo tarea.'
    const { nombre } = req.body;
    const tarea = await Tareas.create(req.body, {
      validate: true,
    });
    res.status(201).json({
      status: "ok",
      message: "Tareas created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update a Tareas
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const update = async (req, res, next) => {
  try {
    //#swagger.tags = ['Tareas']
    //#swagger.description = 'Actualiza un tarea por id.'

    const tarea = await Tareas.findByPk(req.params.id);
    if (!tarea) {
      throw { status: 404, message: "Tareas not found" };
    }
    tarea.completada = !tarea.completada;
    await tarea.save();
    res.status(200).json({
      status: "ok",
      message: "Tareas updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Delete a Tareas
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */

export const destroy = async (req, res, next) => {
  try {
    //#swagger.tags = ['Tareas']
    //#swagger.description = 'Elimina un tarea por id.'

    const tarea = await Tareas.findByPk(req.params.id);
    if (!tarea) {
      throw { status: 404, message: "Tareas not found" };
    }
    await tarea.destroy();
    res.status(204).json({
      status: "ok",
      message: "Tareas deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const clearAll = async (req, res, next) => {
  try {
    //#swagger.tags = ['Tareas']
    //#swagger.description = 'Elimina todas las tareas completadas'

    const deletedCount = await Tareas.destroy({
      where: { completada: true },
    });

    res.status(200).json({
      status: "ok",
      message: `${deletedCount} tareas completadas eliminadas`,
    });
  } catch (error) {
    next(error);
  }
};

export default { index, show, store, update, destroy, clearAll };
