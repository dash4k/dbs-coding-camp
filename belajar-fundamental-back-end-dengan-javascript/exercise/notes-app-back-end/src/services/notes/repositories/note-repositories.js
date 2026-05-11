import { nanoid } from 'nanoid';
import { Pool } from 'pg';
import collaborationRepositories from '../../collaborations/repositories/collaboration-repositories.js';
import CacheService from '../../../cache/redis-service.js';

class NoteRepositories {
  constructor() {
    this._pool = new Pool();
    this._collaborationRepositories = collaborationRepositories;
    this._cacheService = new CacheService();
  }

  async createNote({ title, body, tags, owner }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO notes(id, title, body, tags, created_at, updated_at, owner) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, title, body, tags, created_at, updated_at',
      values: [id, title, body, tags, createdAt, updatedAt, owner],
    };

    const result = await this._pool.query(query);

    if (result.rows[0]) {
      await this._cacheService.delete(`notes:${owner}`);
    }

    return result.rows[0];
  }

  async getNotes(owner) {
    const cacheKey = `notes:${owner}`;

    try {
      const notes = await this._cacheService.get(cacheKey);
      return JSON.parse(notes);
    } catch (_error) {
      const query = {
        text: `SELECT notes.* FROM notes
        LEFT JOIN collaborations ON collaborations.note_id = notes.id
        WHERE notes.owner = $1 OR collaborations.user_id = $1
        GROUP BY notes.id`,
        values: [owner],
      };

      const result = await this._pool.query(query);

      await this._cacheService.set(cacheKey, JSON.stringify(result.rows));

      return result.rows;
    }

  }

  async getNoteById(id) {
    const query = {
      text: `SELECT notes.*, users.username
      FROM notes
      LEFT JOIN users ON users.id = notes.owner
      WHERE notes.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async editNote({ id, title, body, tags }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: 'UPDATE notes SET title = $1, body = $2, tags = $3, updated_at = $4 WHERE id = $5 RETURNING id',
      values: [title, body, tags, updatedAt, id],
    };

    const result = await this._pool.query(query);

    const owner = result.rows[0].owner;

    if (result.rows[0]) {
      await this._cacheService.delete(`notes:${owner}`);
    }

    return result.rows[0];
  }

  async deleteNote(id) {
    const query = {
      text: 'DELETE FROM notes WHERE id = $1 RETURNING Id',
      values: [id],
    };

    const result = await this._pool.query(query);

    const owner = result.rows[0].owner;

    if (result.rows[0]) {
      await this._cacheService.delete(`notes:${owner}`);
    }

    return result.rows[0].id;
  }

  async verifyNoteOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM notes WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    const note = result.rows[0];

    if (note.owner !== owner) {
      return null;
    }

    return result.rows[0];
  }

  async verifyNoteExist(id) {
    const query = {
      text: 'SELECT * FROM notes WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      return false;
    }

    return true;
  }

  async verifyNoteAccess(noteId, userId) {
    const ownerResult = await this.verifyNoteOwner(noteId, userId);

    if (ownerResult) {
      return ownerResult;
    }

    const result = await this._collaborationRepositories.verifyCollaborator(noteId, userId);

    return result;
  }
}

export default new NoteRepositories();
