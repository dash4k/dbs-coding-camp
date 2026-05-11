/* eslint-disable camelcase */

/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('jobs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    company_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    category_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    title: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    description: {
      type: 'TEXT',
      notNull: true,
    },
    job_type: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    experience_level: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    location_type: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    location_city: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    salary_min: {
      type: 'INT',
      notNull: false,
    },
    salary_max: {
      type: 'INT',
      notNull: false,
    },
    is_salary_visible: {
      type: 'BOOLEAN',
      notNull: false,
    },
    status: {
      type: 'VARCHAR(20)',
      notNull: true,
      default: 'open',
      check: "status IN ('open', 'closed')",
    },
    created_at: {
      type: 'TIMESTAMPTZ',
      notNull: true,
    },
    updated_at: {
      type: 'TIMESTAMPTZ',
      notNull: true,
    },
  });

  pgm.addConstraint('jobs', 'fk_jobs.user_id_users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
  pgm.addConstraint('jobs', 'fk_jobs.company_id_companies.id', 'FOREIGN KEY(company_id) REFERENCES companies(id) ON DELETE CASCADE');
  pgm.addConstraint('jobs', 'fk_jobs.category_id.categories.id', 'FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('jobs');
};
