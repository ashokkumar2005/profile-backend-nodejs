import { asyncHandler } from "../middleware/errorHandler.js";

/**
 * Generic CRUD controller factory. Every content resource (Skill, Project,
 * Education, Achievement, Certification, Testimonial) follows the exact
 * same shape, so we build the handlers once here instead of repeating
 * getAll/getOne/create/update/remove per model.
 *
 * Pass `sort` to control default ordering (e.g. { order: 1 } or { createdAt: -1 }).
 */
export function createCRUDController(Model, { sort = { order: 1, createdAt: 1 } } = {}) {
  const getAll = asyncHandler(async (req, res) => {
    const items = await Model.find().sort(sort);
    res.json(items);
  });

  const getOne = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error(`${Model.modelName} not found`);
    }
    res.json(item);
  });

  const create = asyncHandler(async (req, res) => {
    const item = await Model.create(req.body);
    res.status(201).json(item);
  });

  const update = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      res.status(404);
      throw new Error(`${Model.modelName} not found`);
    }
    res.json(item);
  });

  const remove = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error(`${Model.modelName} not found`);
    }
    res.json({ message: `${Model.modelName} deleted`, id: req.params.id });
  });

  return { getAll, getOne, create, update, remove };
}
