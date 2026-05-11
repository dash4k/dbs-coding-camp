import CategoryRepositories from '../repositories/category-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const listCategories = async (_req, res, _next) => {
  const categories = await CategoryRepositories.getCategories();
  return response(res, 200, 'Categories listed', { categories });
};

export const viewCategoryDetail = async (req, res, next) => {
  const { id } = req.params;

  const category = await CategoryRepositories.getCategoryById(id);

  if (!category) {
    return next(new NotFoundError('Category not found'));
  }

  return response(res, 200, 'Category found', category);
};

export const registerCategory = async (req, res, next) => {
  const { name } = req.validated;

  const categoryExist = await CategoryRepositories.verifyCategoryExistByName(name);

  if (categoryExist) {
    return next(new InvariantError('Error while trying to add new category. Category name already exist'));
  }

  const categoryId = await CategoryRepositories.createCategory({ name });

  if (!categoryId) {
    return next(new InvariantError('Error while trying to add new category'));
  }

  return response(res, 201, 'Category added successfully', categoryId);
};

export const editCategoryDetail = async (req, res, next) => {
  const { id } = req.params;

  const categoryExist = await CategoryRepositories.verifyCategoryExistById(id);

  if (!categoryExist) {
    return next(new NotFoundError('Category not found'));
  }

  const { name } = req.validated;

  const categoryId = await CategoryRepositories.updateCategory({ id, name });

  if (!categoryId) {
    return next(new InvariantError('Error while trying to edit category detail'));
  }

  return response(res, 200, 'Category edited successfully');
};

export const removeCategory = async (req, res, next) => {
  const { id } = req.params;

  const categoryExist = await CategoryRepositories.verifyCategoryExistById(id);

  if (!categoryExist) {
    return next(new NotFoundError('Category not found'));
  }

  const categoryId = await CategoryRepositories.deleteCategory(id);

  if (!categoryId) {
    return next(new InvariantError('Error while trying to remove category'));
  }

  return response(res, 200, 'Category removed successfully');
};
