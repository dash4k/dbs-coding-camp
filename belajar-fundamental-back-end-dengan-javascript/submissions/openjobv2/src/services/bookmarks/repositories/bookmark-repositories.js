import { Pool } from 'pg';
import { nanoid } from 'nanoid';
import CacheService from '../../../cache/redis-service.js';

class BookmarkRepositories {
  constructor() {
    this._pool = new Pool();
    this._cacheService = new CacheService();
  }

  async createBookmark({ jobId, userId }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();

    const result = await this._pool.query({
      text: 'INSERT INTO bookmarks VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, userId, jobId, createdAt],
    });

    if (result.rows[0]) {
      await this._cacheService.delete(`bookmarks:${userId}`);
    }

    return result.rows[0];
  }

  async getBookmark(id) {
    const result = await this._pool.query({
      text: 'SELECT * FROM bookmarks WHERE id = $1',
      values: [id],
    });

    return result.rows[0];
  }

  async deleteBookmark({ jobId, userId }) {
    const result = await this._pool.query({
      text: 'DELETE FROM bookmarks WHERE user_id = $1 AND job_id = $2 RETURNING id',
      values: [userId, jobId],
    });

    if (result.rows[0]) {
      await this._cacheService.delete(`bookmarks:${userId}`);
    }

    return result.rows.length > 0;
  }

  async getBookmarks(id) {
    const cacheKey = `bookmarks:${id}`;

    try {
      const bookmarks = await this._cacheService.get(cacheKey);
      return { bookmarks: JSON.parse(bookmarks), fromCache: true };
    } catch (_error) {
      const result = await this._pool.query({
        text: 'SELECT * FROM bookmarks WHERE user_id = $1',
        values: [id],
      });

      await this._cacheService.set(cacheKey, JSON.stringify(result.rows));

      const bookmarks = result.rows.map((bookmark) => {
        return {
          ...bookmark,
          one: null,
          two: null,
          three: null,
          four: null,
          five: null,
          six: null,
          seven: null,
          eight: null,
          nine: null,
          ten: null,
          eleven: null,
          twelve: null,
          thirteen: null,
          fourteen: null
        };
      });

      return { bookmarks, fromCache: false };
    }
  }
}

export default new BookmarkRepositories();
