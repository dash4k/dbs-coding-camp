import { nanoid } from 'nanoid';
import { Pool } from 'pg';

class CompanyRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async getCompanies() {
    const result = await this._pool.query('SELECT name, location, description FROM companies');

    return result.rows;
  }

  async getCompanyById(id) {
    const result = await this._pool.query({
      text: 'SELECT id, name FROM companies WHERE id = $1',
      values: [id],
    });

    return result.rows[0];
  }

  async createCompany({ name, location, description }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const result = await this._pool.query({
      text: 'INSERT INTO companies VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, name, location, description, createdAt, updatedAt],
    });

    return result.rows[0];
  }

  async verifyCompanyExist(id) {
    const result = await this._pool.query({
      text: 'SELECT id FROM companies WHERE id = $1',
      values: [id],
    });

    return result.rows.length > 0;
  }

  async updateCompany({ id, name, location, description }) {
    const updatedAt = new Date().toISOString();

    const result = await this._pool.query({
      text: 'UPDATE companies SET name = $1, location = $2, description = $3, updated_at = $4 WHERE id = $5 RETURNING id',
      values: [name, location, description, updatedAt, id],
    });

    return result.rows.length > 0;
  }

  async deleteCompany(id) {
    const result = await this._pool.query({
      text: 'DELETE FROM companies WHERE id = $1 RETURNING id',
      values: [id],
    });

    return result.rows.length > 0;
  }
}

export default new CompanyRepositories();
