import { Pool } from 'pg';

class AuthenticationRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createRefreshToken(token) {
    await this._pool.query({
      text: 'INSERT INTO authentications VALUES($1)',
      values: [token],
    });
  }

  async verifyRefreshToken(token) {
    const result = await this._pool.query({
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    });

    if (!result.rows.length) {
      return false;
    }

    return result.rows[0];
  }

  async deleteRefreshToken(token) {
    await this._pool.query({
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token],
    });
  }
}

export default new AuthenticationRepositories();
