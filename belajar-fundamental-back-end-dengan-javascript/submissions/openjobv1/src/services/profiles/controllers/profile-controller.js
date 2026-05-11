import ProfileRepositories from '../repositories/profile-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';

export const viewUserProfile = async (req, res, next) => {
  const { id } = req.user;

  const profile = await ProfileRepositories.getProfile(id);

  if (!profile) {
    return next(new InvariantError('Error while trying to get profile details'));
  }

  return response(res, 200, 'Profile listed', profile);
};

export const viewUserApplications = async (req, res, _next) => {
  const { id } = req.user;

  const applications = await ProfileRepositories.getApplications(id);

  return response(res, 200, 'Applications listed', { applications });
};

export const viewUserBookmarks = async (req, res, _next) => {
  const { id } = req.user;

  const bookmarks = await ProfileRepositories.getBookmarks(id);

  return response(res, 200, 'Bookmarks listed', { bookmarks });
};
