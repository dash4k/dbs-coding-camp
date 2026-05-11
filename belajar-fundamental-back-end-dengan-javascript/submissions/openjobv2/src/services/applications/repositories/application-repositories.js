import { Pool } from 'pg';
import { nanoid } from 'nanoid';
import CacheService from '../../../cache/redis-service.js';

class ApplicationRepositories {
  constructor() {
    this._pool = new Pool();
    this._cacheService = new CacheService();
  }

  async createApplication({ userId, jobId, status }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const result = await this._pool.query({
      text: 'INSERT INTO applications VALUES($1, $2, $3, $4, $5, $6) RETURNING id, user_id, job_id, status',
      values: [id, userId, jobId, status, createdAt, updatedAt],
    });

    await this._cacheService.delete(`userApplications:${userId}`);
    await this._cacheService.delete(`jobApplications:${jobId}`);
    return result.rows[0];
  }

  async getApplications() {
    const result = await this._pool.query('SELECT * FROM applications');

    const applications = result.rows.map((application) => {
      return {
        ...application,
        one: null,
        two: null,
        three: null,
        four: null,
        five: null,
        six: null,
        seven: null
      };
    });

    return applications;
  }

  async getApplicationById(id) {
    const cacheKey = `application:${id}`;
    try {
      const application = await this._cacheService.get(cacheKey);
      return { application: JSON.parse(application), fromCache: true };
    } catch (_error) {
      const result = await this._pool.query({
        text: 'SELECT * FROM applications WHERE id = $1',
        values: [id],
      });

      if (!result.rows[0]) {
        return { application: null, fromCache: false };
      }

      await this._cacheService.set(cacheKey, JSON.stringify(result.rows[0]));

      return { application: result.rows[0], fromCache: false };

    }
  }

  async getApplicationsByUser(userId) {
    const cacheKey = `userApplications:${userId}`;

    try {
      const applications = await this._cacheService.get(cacheKey);
      return { applications: JSON.parse(applications), fromCache: true };
    } catch (_error) {
      const result = await this._pool.query({
        text: 'SELECT * FROM applications WHERE user_id = $1',
        values: [userId],
      });

      await this._cacheService.set(cacheKey, JSON.stringify(result.rows));

      return { applications: result.rows, fromCache: false };

    }
  }

  async getApplicationsByJob(jobId) {
    const cacheKey = `jobApplications:${jobId}`;

    try {
      const applications = await this._cacheService.get(cacheKey);
      return { applications: JSON.parse(applications), fromCache: true };
    } catch (_error) {
      const result = await this._pool.query({
        text: 'SELECT * FROM applications WHERE job_id = $1',
        values: [jobId],
      });

      await this._cacheService.set(cacheKey, JSON.stringify(result.rows));

      return { applications: result.rows, fromCache: false };

    }
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
      text: 'UPDATE applications SET status = $1, updated_at = $2 WHERE id = $3 RETURNING id, user_id, job_id',
      values: [status, updatedAt, id],
    });

    if (result.rows[0]) {
      await this._cacheService.delete(`application:${result.rows[0].id}`);
      await this._cacheService.delete(`userApplications:${result.rows[0].user_id}`);
      await this._cacheService.delete(`jobApplications:${result.rows[0].job_id}`);
    }

    return result.rows.length > 0;
  }

  async deleteApplication(id) {
    const result = await this._pool.query({
      text: 'DELETE FROM applications WHERE id = $1 RETURNING id',
      values: [id],
    });

    if (result.rows[0]) {
      await this._cacheService.delete(`application:${result.rows[0].id}`);
      await this._cacheService.delete(`userApplications:${result.rows[0].user_id}`);
      await this._cacheService.delete(`jobApplications:${result.rows[0].job_id}`);
    }

    return result.rows.length > 0;
  }
}

export default new ApplicationRepositories();
