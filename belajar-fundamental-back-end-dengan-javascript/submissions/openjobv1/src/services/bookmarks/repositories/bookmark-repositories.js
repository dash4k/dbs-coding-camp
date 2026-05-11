import { Pool } from 'pg';
import { nanoid } from 'nanoid';

class BookmarkRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createBookmark({ jobId, userId }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();

    const result = await this._pool.query({
      text: 'INSERT INTO bookmarks VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, userId, jobId, createdAt],
    });

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

    return result.rows.length > 0;
  }

  async getBookmarks(id) {
    const result = await this._pool.query({
      text: 'SELECT * FROM bookmarks WHERE user_id = $1',
      values: [id],
    });

    return result.rows;
  }
}

export default new BookmarkRepositories();
