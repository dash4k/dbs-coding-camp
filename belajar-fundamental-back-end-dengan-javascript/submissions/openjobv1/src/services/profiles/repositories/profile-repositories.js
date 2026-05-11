import { Pool } from 'pg';

class ProfileRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async getProfile(id) {
    const result = await this._pool.query({
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    });

    return result.rows[0];
  }

  async getApplications(id) {
    const result = await this._pool.query({
      text: 'SELECT * FROM applications WHERE user_id = $1',
      values: [id],
    });

    return result.rows;
  }

  async getBookmarks(id) {
    const result = await this._pool.query({
      text: 'SELECT * FROM bookmarks WHERE user_id = $1',
      values: [id],
    });

    return result.rows;
  }
}

export default new ProfileRepositories();
