/* eslint-disable camelcase */
import { Pool } from 'pg';
import { nanoid } from 'nanoid';
import CompanyRepositories from '../../companies/repositories/company-repositories.js';
import CategoryRepositories from '../../categories/repositories/category-repositories.js';

class JobRepositories {
  constructor() {
    this._pool = new Pool();
    this._companyRepositories = CompanyRepositories;
    this._categoryRepositories = CategoryRepositories;
  }

  async getJobs({ title, companyName }) {
    const query = {
      text: `SELECT
      jobs.id,
      jobs.user_id,
      jobs.company_id,
      jobs.category_id,
      jobs.title,
      jobs.description,
      jobs.job_type,
      jobs.experience_level,
      jobs.location_type,
      jobs.location_city,
      jobs.salary_min,
      jobs.salary_max,
      jobs.is_salary_visible
      FROM jobs 
      LEFT JOIN companies ON companies.id = jobs.company_id`,
      values: [],
    };

    const conditions = [];

    if (title) {
      conditions.push(`jobs.title ILIKE $${conditions.length + 1}`);
      query.values.push(`%${title}%`);
    }

    if (companyName) {
      conditions.push(`companies.name ILIKE $${conditions.length + 1}`);
      query.values.push(`${companyName}`);
    }

    if (conditions.length) {
      query.text += ` WHERE ${conditions.join(' AND ')}`;
    }

    const result = await this._pool.query(query);

    return result.rows;
  }

  async getJobById(id) {
    const result = await this._pool.query({
      text: 'SELECT * FROM jobs WHERE id = $1',
      values: [id],
    });

    return result.rows[0];
  }

  async getJobsFromCompany(companyId) {
    const companyExist = this._companyRepositories.verifyCompanyExist(companyId);

    if (!companyExist) {
      return false;
    }

    const result = await this._pool.query({
      text: 'SELECT * FROM jobs WHERE company_id = $1',
      values: [companyId],
    });

    return result.rows;
  }

  async getJobsFromCategory(categoryId) {
    const categoryExist = this._categoryRepositories.verifyCategoryExistById(categoryId);

    if (!categoryExist) {
      return false;
    }

    const result = await this._pool.query({
      text: 'SELECT * FROM jobs WHERE category_id = $1',
      values: [categoryId],
    });

    return result.rows;
  }

  async createJob(user_id, {
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status
  }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const result = await this._pool.query({
      text: 'INSERT INTO jobs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id',
      values: [
        id,
        user_id,
        company_id,
        category_id,
        title,
        description,
        job_type,
        experience_level,
        location_type,
        location_city,
        salary_min,
        salary_max,
        is_salary_visible,
        status,
        createdAt,
        updatedAt
      ],
    });

    return result.rows[0];
  }

  async verifyJobExist(id) {
    const result = await this._pool.query({
      text: 'SELECT id FROM jobs WHERE id = $1',
      values: [id],
    });

    return result.rows.length > 0;
  }

  async updateJob(id, { title, description, salary_max }) {
    const updatedAt = new Date().toISOString();

    const result = await this._pool.query({
      text: 'UPDATE jobs SET title = $1, description = $2, salary_max = $3, updated_at = $4 WHERE id = $5 RETURNING id',
      values: [title, description, salary_max, updatedAt, id]
    });

    return result.rows[0];
  }

  async deleteJob(id) {
    const result = await this._pool.query({
      text: 'DELETE FROM jobs WHERE id = $1 RETURNING id',
      values: [id],
    });

    return result.rows[0];
  }
}

export default new JobRepositories();
