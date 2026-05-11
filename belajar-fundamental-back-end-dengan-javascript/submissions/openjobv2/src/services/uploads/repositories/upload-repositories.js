/* eslint-disable camelcase */
import { Pool } from 'pg';
import { nanoid } from 'nanoid';

class UploadRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createDocument(user_id, { filename, originalname, size, path }) {
    const id = nanoid(16);
    const created_at = new Date().toISOString();

    const result = await this._pool.query({
      text: 'INSERT INTO documents VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, filename, originalname, size',
      values: [id, user_id, filename, originalname, size, path, created_at],
    });

    if (result.rows.length === 0) {
      return false;
    }

    const document = {
      documentId: result.rows[0].id,
      filename: result.rows[0].filename,
      originalName: result.rows[0].originalname,
      size: result.rows[0].size
    };

    return document;
  }

  async getDocuments() {
    const result = await this._pool.query('SELECT * FROM documents');
    return result.rows;
  }

  async getDocument(id) {
    const result = await this._pool.query({
      text: 'SELECT * FROM documents WHERE id = $1',
      values: [id],
    });

    return result.rows[0];
  }

  async deleteDocument(id) {
    const result = await this._pool.query({
      text: 'DELETE FROM documents WHERE id = $1 RETURNING path',
      values: [id],
    });

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0].path;
  }

  async verifyDocumentExist(id) {
    const result = await this._pool.query({
      text: 'SELECT id FROM documents WHERE id = $1',
      values: [id],
    });

    return result.rows.length > 0;
  }

  async verifyDocumentOwner(documentId, userId) {
    const result = await this._pool.query({
      text: 'SELECT id FROM documents WHERE id = $1 AND user_id = $2',
      values: [documentId, userId],
    });

    return result.rows.length > 0;
  }
}

export default new UploadRepositories();
