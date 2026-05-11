import { nanoid } from 'nanoid';
import { Pool } from 'pg';
import CacheService from '../../../cache/redis-service.js';

class CompanyRepositories {
  constructor() {
    this._pool = new Pool();
    this._cacheService = new CacheService();
  }

  async getCompanies() {
    const result = await this._pool.query('SELECT * FROM companies');

    return result.rows;
  }

  async getCompanyById(id) {
    const cacheKey = `company:${id}`;

    try {
      const company = await this._cacheService.get(cacheKey);
      return { company: JSON.parse(company), fromCache: true };
    } catch (_error) {
      const result = await this._pool.query({
        text: 'SELECT id, name FROM companies WHERE id = $1',
        values: [id],
      });

      if (!result.rows[0]) {
        return { company: null, fromCache: false };
      }

      await this._cacheService.set(cacheKey, JSON.stringify(result.rows[0]));

      return { company: result.rows[0], fromCache: false };
    }
  }

  async createCompany({ name, location, description }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const result = await this._pool.query({
      text: 'INSERT INTO companies VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, name, location, description, createdAt, updatedAt],
    });

    if (result.rows[0]) {
      await this._cacheService.delete(`company:${id}`);
    }

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

    if (result.rows[0]) {
      await this._cacheService.delete(`company:${id}`);
    }

    return result.rows.length > 0;
  }

  async deleteCompany(id) {
    const result = await this._pool.query({
      text: 'DELETE FROM companies WHERE id = $1 RETURNING id',
      values: [id],
    });

    if (result.rows[0]) {
      await this._cacheService.delete(`company:${id}`);
    }

    return result.rows.length > 0;
  }
}

export default new CompanyRepositories();
