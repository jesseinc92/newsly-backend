const db = require('../db');
const { BadRequestError, NotFoundError } = require('../expressError');

class Metric {

  static async create({ username, goal }) {
    const duplicateCheck = await db.query(
      `SELECT user_id
       FROM metrics
       WHERE user_id = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) throw new BadRequestError(`Metrics for ${username} already exist`);

    const result = await db.query(
        `INSERT INTO metrics (
          user_id,
          goal
         )
         VALUES ($1, $2)
         RETURNING
          goal,
          us_news AS "usNews",
          world_news AS "worldNews",
          business,
          opinion,
          sport,
          culture,
          science,
          lifestyle,
          metricsQueue`,
        [username, goal]
    );

    const metrics = result.rows[0];

    return metrics;
  }

  static async get(username) {
    const result = await db.query(
        `SELECT
          goal,
          us_news AS "usNews",
          world_news AS "worldNews",
          business,
          opinion,
          sport,
          culture,
          science,
          lifestyle,
          metricsqueue
         FROM metrics
         WHERE user_id = $1`,
        [username]
    );

    const metrics = result.rows[0]
    metrics.metricsqueue = metrics.metricsqueue ? metrics.metricsqueue.split(',') : [];
    
    return metrics;
  }

  static async updateGoal(username, goal) {
    console.log(goal)
    const result = await db.query(
        `UPDATE metrics
         SET
          goal = $1
         WHERE user_id = $2
         RETURNING goal`,
        [goal.goal, username]
    );

    const updatedMetrics = result.rows[0];

    if (!updatedMetrics) throw new BadRequestError('Something went wrong!');

    return updatedMetrics;
  }

  static async updateMetrics(username, metrics) {
    
    const result = await db.query(
        `UPDATE metrics
         SET
          goal = $1,
          us_news = $2,
          world_news = $3,
          business = $4,
          opinion = $5,
          sport = $6,
          culture = $7,
          science = $8,
          lifestyle = $9,
          metricsqueue = $10
         WHERE user_id = $11
         RETURNING user_id AS "userId"`,
        [
          metrics.goal,
          metrics.usNews,
          metrics.worldNews,
          metrics.business,
          metrics.opinion,
          metrics.sport,
          metrics.culture,
          metrics.science,
          metrics.lifestyle,
          metrics.metricsqueue.join(','),
          username
        ]
    );

    const success = result.rows[0];

    if (!success) throw new BadRequestError('Something went wrong!');

    return 'Successfully updated';
  }
}

module.exports = Metric;