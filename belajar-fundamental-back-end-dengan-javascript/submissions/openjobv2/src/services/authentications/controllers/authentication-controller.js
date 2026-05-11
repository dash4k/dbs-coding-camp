import AuthenticationRepositories from '../repositories/authentication-repositories.js';
import UserRepositories from '../../users/repositories/user-repositories.js';
import TokenManager from '../../../security/token-manager.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import AuthenticationError from '../../../exceptions/authentication-error.js';

export const login = async (req, res, next) => {
  const { email, password } = req.validated;
  const userId = await UserRepositories.verifyUserCredential(email, password);

  if (!userId) {
    return next(new AuthenticationError('Invalid credentials!'));
  }

  const accessToken = TokenManager.generateAccessToken({ id: userId });
  const refreshToken = TokenManager.generateRefreshToken({ id: userId });

  await AuthenticationRepositories.createRefreshToken(refreshToken);

  return response(res, 200, 'Authentication created successfully', {
    accessToken,
    refreshToken,
  });
};

export const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.validated;

  const result = await AuthenticationRepositories.verifyRefreshToken(refreshToken);

  if (!result) {
    return next(new InvariantError('Invalid refresh token'));
  }

  const { id } = TokenManager.verifyRefreshToken(refreshToken);
  const accessToken = TokenManager.generateAccessToken({ id });

  return response(res, 200, 'Access token updated successfully', { accessToken });
};

export const logout = async (req, res, next) => {
  const { refreshToken } = req.validated;

  const result = await AuthenticationRepositories.verifyRefreshToken(refreshToken);

  if (!result) {
    return next(new InvariantError('Invalid refresh token'));
  }

  await AuthenticationRepositories.deleteRefreshToken(refreshToken);

  return response(res, 200, 'Refresh token deleted successfully');
};
