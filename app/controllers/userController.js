const { hash, compare } = require('../services/crypt');

const User = require('../models/User');

const jwt = require('jsonwebtoken');

module.exports = {
    /**
     * Inserts a new User in the database
     * @param {*} req 
     * @param {*} res 
     */
    register: async (req, res) => {

        //we hash the password before inserting it in db
        req.body.password = await hash(req.body.password);

        //req.body represent the new user that was sent through a form
        const newUser = new User(req.body);

        try {
            // save should launch an insert in DB
            await newUser.save();

            // response status 201 =  created
            res.status(201).json('user Successfuly created');
        } catch (error) {
            // or error server
            res.status(500).json({ message: error.message });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {

            const user = await User.findByEmail(email);

            // if user not found in db or incorrect password => 401
            if (user === null || !(await compare(password, user.password))) {

                res.status(401).json({ message: 'Auth failed' });

            } else {
                // auth successful, generate token
                const token = jwt.sign(
                    { email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: 60 * 60 /* 1h */ });
                res.status(200).json({ token });

            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
