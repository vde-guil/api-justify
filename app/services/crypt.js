const bcrypt = require('bcrypt');

const saltRounds = 10;


module.exports = {
    /**
     * service that hashes before user is store in database
     * @param {string} password 
     * @returns {string} hashed password
     */
    hash: async (password) => {
        return await bcrypt.hash(password, saltRounds);
    },

    /**
     * service that compares a clear password and hashed password for authentication
     * @param {string} password - clear password
     * @param {string} hash - hashed password
     * @returns {bool} - true or false depending on if the password are the same
     */
    compare: async (password, hash) => {
        return await bcrypt.compare(password, hash);
    }
}