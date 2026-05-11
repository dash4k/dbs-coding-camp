import { Pool } from 'pg';
import { nanoid } from 'nanoid';

class ApplicationRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createApplication({ userId, jobId, status }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const result = await this._pool.query({
      text: 'INSERT INTO applications VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, userId, jobId, status, createdAt, updatedAt],
    });

    return result.rows[0];
  }

  async getApplications() {
    const result = await this._pool.query('SELECT * FROM applications');
    return result.rows;
  }

  async getApplicationById(id) {
    const result = await this._pool.query({
      text: 'SELECT * FROM applications WHERE id = $1',
      values: [id],
    });

    return result.rows[0];
  }

  async getApplicationsByUser(userId) {
    const result = await this._pool.query({
      text: 'SELECT * FROM applications WHERE user_id = $1',
      values: [userId],
    });

    return result.rows;
  }

  async getApplicationsByJob(jobId) {
    const result = await this._pool.query({
      text: 'SELECT * FROM applications WHERE job_id = $1',
      values: [jobId],
    });

    return result.rows;
  }

  async verifyApplicationExist(id) {
    const result = await this._pool.query({
      text: 'SELECT id FROM applications WHERE id = $1',
      values: [id],
    });

    return result.rows.length > 0;
  }

  async updateApplication({ id, status }) {
    const updatedAt = new Date().toISOString();

    const result = await this._pool.query({
      text: 'UPDATE applications SET status = $1, updated_at = $2 WHERE id = $3 RETURNING id',
      values: [status, updatedAt, id],
    });

    return result.rows.length > 0;
  }

  async deleteApplication(id) {
    const result = await this._pool.query({
      text: 'DELETE FROM applications WHERE id = $1 RETURNING id',
      values: [id],
    });

    return result.rows.length > 0;
  }
}

export default new ApplicationRepositories();
