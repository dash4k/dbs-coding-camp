import UserRepositories from '../repositories/user-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const register = async (req, res, next) => {
  const { name, email, password, role } = req.validated;

  const emailExist = await UserRepositories.verifyNewEmail(email);
  if (emailExist) {
    return next(new InvariantError('Error while trying to create new user. Email is already used'));
  }

  const user = await UserRepositories.createUser({
    name,
    email,
    password,
    role
  });

  if (!user) {
    return next(new InvariantError('Error while trying to create new user'));
  }

  return response(res, 201, 'User created successfully', user);
};

export const getUserProfile = async (req, res, next) => {
  const { id } = req.params;
  const { user, fromCache } = await UserRepositories.getUserById(id);

  if (!user) {
    return next(new NotFoundError('User not found'));
  }

  res.setHeader('X-Data-Source', fromCache ? 'cache' : 'database');

  return response(res, 200, 'User found', {
    id: user.id,
    name: user.name
  });
};
