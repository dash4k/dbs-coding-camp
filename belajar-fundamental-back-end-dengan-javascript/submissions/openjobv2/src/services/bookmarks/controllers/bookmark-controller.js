import BookmarkRepositories from '../repositories/bookmark-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const addBookmark = async (req, res, next) => {
  const { jobId } = req.params;
  const { id: userId } = req.user;

  const id = await BookmarkRepositories.createBookmark({ jobId, userId });

  if (!id) {
    return next(new InvariantError('Error while trying to add new bookmark'));
  }

  return response(res, 201, 'Bookmark added successfully', id);
};

export const viewBookmarkDetails = async (req, res, next) => {
  const { id } = req.params;

  const bookmark = await BookmarkRepositories.getBookmark(id);

  if (!bookmark) {
    return next(new NotFoundError('Bookmark not found'));
  }

  return response(res, 200, 'Bookmark found', bookmark);
};

export const removeBookmark = async (req, res, next) => {
  const { jobId } = req.params;
  const { id: userId } = req.user;

  const success = await BookmarkRepositories.deleteBookmark({ jobId, userId });

  if (!success) {
    return next(new InvariantError('Error while trying to remove bookmark'));
  }

  return response(res, 200, 'Bookmark removed successfully');
};

export const listBookmarks = async (req, res, _next) => {
  const { id } = req.user;

  const { bookmarks, fromCache } = await BookmarkRepositories.getBookmarks(id);

  res.setHeader('X-Data-Source', fromCache ? 'cache' : 'database');

  return response(res, 200, 'Bookmarks listed', { bookmarks });
};