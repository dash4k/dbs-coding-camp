import { Pool } from 'pg';
import { nanoid } from 'nanoid';

class CategoryRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async getCategories() {
    const result = await this._pool.query('SELECT * FROM categories');
    return result.rows;
  }

  async getCategoryById(id) {
    const result = await this._pool.query({
      text: 'SELECT id, name FROM categories WHERE id = $1',
      values: [id],
    });

    return result.rows[0];
  }

  async verifyCategoryExistByName(name) {
    const result = await this._pool.query({
      text: 'SELECT name FROM categories WHERE name = $1',
      values: [name],
    });

    return result.rows.length > 0;
  }

  async createCategory({ name }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const result = await this._pool.query({
      text: 'INSERT INTO categories VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, name, createdAt, updatedAt],
    });

    return result.rows[0];
  }

  async verifyCategoryExistById(id) {
    const result = await this._pool.query({
      text: 'SELECT name FROM categories WHERE id = $1',
      values: [id],
    });

    return result.rows.length > 0;
  }

  async updateCategory({ id, name }) {
    const updatedAt = new Date().toISOString();

    const result = await this._pool.query({
      text: 'UPDATE categories SET name = $1, updated_at = $2 WHERE id = $3 RETURNING id',
      values: [name, updatedAt, id],
    });

    return result.rows.length > 0;
  }

  async deleteCategory(id) {
    const result = await this._pool.query({
      text: 'DELETE FROM categories WHERE id = $1 RETURNING id',
      values: [id],
    });

    return result.rows.length > 0;
  }
}

export default new CategoryRepositories();
