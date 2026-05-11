import { Pool } from 'pg';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

class UserRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createUser({ name, email, password, role }) {
    const id = nanoid(16);
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const result = await this._pool.query({
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, name, email, hashedPassword, role, createdAt, updatedAt],
    });

    return result.rows[0];
  }

  async verifyNewEmail(email) {
    const result = await this._pool.query({
      text: 'SELECT id FROM users WHERE email = $1',
      values: [email],
    });

    return result.rows.length > 0;
  }

  async getUserById(id) {
    const result = await this._pool.query({
      text: 'SELECT name FROM users WHERE id = $1',
      values: [id],
    });

    return result.rows[0];
  }

  async verifyUserCredential(email, password) {
    const user = await this._pool.query({
      text: 'SELECT id, password FROM users WHERE email = $1',
      values: [email],
    });

    if (!user.rows.length) {
      return null;
    };

    console.log(user.rows[0]);
    const { id, password: hashedPassword } = user.rows[0];
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return null;
    }

    return id;
  }

  async verifyUserExist(id) {
    const result = await this._pool.query({
      text: 'SELECT id FROM users WHERE id = $1',
      values: [id],
    });

    return result.rows.length > 0;
  }
};

export default new UserRepositories();
