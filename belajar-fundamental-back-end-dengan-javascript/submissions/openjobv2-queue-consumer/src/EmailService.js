import { Pool } from 'pg';

class EmailService {
  constructor() {
    this._pool = new Pool();
  }

  async getEmailMessage(applicationId) {
    const result = await this._pool.query({
      text: `SELECT 
            applications.id, 
            users.email, 
            users.name, 
            applications.created_at
            FROM applications
            INNER JOIN users ON applications.user_id = users.id
            WHERE applications.id = $1`,
      values: [applicationId],
    });

    return result.rows[0];
  }

  async getEmailReceiver(jobId) {
    const result = await this._pool.query({
      text: `SELECT users.email
            FROM jobs
            INNER JOIN users ON jobs.user_id = users.id
            WHERE jobs.id = $1`,
      values: [jobId],
    });

    return result.rows[0];
  }
}

export default EmailService;
