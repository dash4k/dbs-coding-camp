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

    const applications = result.rows.map((application) => {
      return {
        ...application,
        one: null,
        two: null,
        three: null,
        four: null,
        five: null,
        six: null,
        seven: null,
        eight: null,
        nine: null,
      };
    });

    return applications;
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
