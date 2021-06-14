const db = require('../database');

/**
 * A entity representing a blog post
 * @typedef User
 * @property {number} id
 * @property {string} email
 * @property {string} username
 */


/**
 * A model representing a user
 * @class
 */
class User {

    /**
     * User constructor
     * @param {*} data - a litteral object with properties that will be copied into the instance
     */
    constructor(data = {}) {
        for (const props in data) {
            this[props] = data[props];
        }
    }

    /**
     * Fetches a single user from database
     * @param {string} email 
     * @returns {User|null} - null if no user has this id
     * @static
     * @async
     */
    static async findByEmail(email) {
        const myQuery = `SELECT * FROM user WHERE email = $1`;

        //prepared query to prevent injections
        const { rows } = await db.query(myQuery, [email]);

        if (rows[0]) {
            return new User(rows[0]);
        }
        return null;
    }

    /**
     * inserts or update entry in database
     * @throws {Error} - potential SQL error
     */

    async save() {
        if (this.id) {
            // means the instance is present in db, so here should come the update
        } else {
            // no ids so we can insert the user
            try {
                // we insert the new user thanks to the sql function we created
                // we pass an object in paramater, he'll be cast in json
                const myQuery = `SELECT * FROM new_user($1)`;

                const { rows } = await db.query(myQuery, [this]);

                // the insert went sucessfully, we now update the instance with the id generated in db
                this.id = +rows[0].id;
            } catch (error) {
                // we throw a new error to get a more readable message through error.details if available
                if (error.details) {
                    throw new Error(error.detail);
                }
                throw new Error(error.message);

            }
        }
    }
}

module.exports = User;