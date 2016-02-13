/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.connections.html
 */

module.exports.connections = {
  /**
   * MongoDB configuration
   * @type {Object}
   */
  mongodb: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: '',
    user: '',
    password: '',
    database: 'sails-diy'
  },

  /**
   * Redis configuration
   * @type {Object}
   */
  redis: {
    adapter: 'sails-redis',
    port: '',
    host: 'localhost',
    password: '',
    database: 'sails-diy',
    options: {
      parser: 'hiredis',
      return_buffers: false,
      detect_buffers: false,
      socket_nodelay: true,
      no_ready_check: false,
      enable_offline_queue: true
    }
  },

  /**
   * PostgreSQL configuration
   * @type {Object}
   */
  postgresql: {
    adapter: 'sails-postgresql',
    database: 'sails-diy',
    host: 'localhost',
    user: '',
    password: '',
    port: '',
    pool: false,
    ssl: false
  },

  /**
   * MySQL configuration
   * @type {Object}
   */
  mysql: {
    adapter: 'sails-mysql',
    host: 'localhost',
    port: '',
    user: '',
    password: '',
    database: 'sails-diy',
    charset: 'utf8',
    collation: 'utf8_swedish_ci'
  },

  /**
   * Microsoft SQL Server configuration
   * @type {Object}
   */
  sqlserver: {
    adapter: 'sails-sqlserver',
    user: '',
    password: '',
    host: 'localhost',
    database: 'sails-diy',
    options: {
      encrypt: false
    }
  },

  /**
   * OrientDB configuration
   * @type {Object}
   */
  orientdb: {
    adapter: 'sails-orientdb',
    host: 'localhost',
    port: '',
    user: '',
    password: '',
    database: 'sails-diy',
    options: {
      databaseType: 'graph',
      storage: 'plocal',
      transport: 'binary',
      decodeURIComponent: true,
      removeCircularReferences: false,
      unsafeDrop: false,
      parameterized: true,
      fetchPlanLevel: 1
    }
  },

  /**
   * DynamoDB configuration
   * @type {Object}
   */
  dynamodb: {
    adapter: 'sails-dynamodb',
    accessKeyId: '',
    secretAccessKey: '',
    region: 'us-west-1'
  },

  /**
   * FileMaker configuration
   * @type {Object}
   */
  filemaker: {
    adapter: 'sails-filemaker',
    host: 'localhost',
    database: 'sails-diy',
    userName: '',
    password: ''
  },

  /**
   * Memory configuration for DEVELOPMENT ONLY
   * @type {Object}
   */
  memory: {
    adapter: 'sails-memory'
  },

  /**
   * Local disk storage for DEVELOPMENT ONLY
   * @type {Object}
   */
  disk: {
    adapter: 'sails-disk'
  }
};
