const { hash, compare } = require('../services/crypt');

const User = require('../models/User');


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
        console.log(email, password);
        try {

            const user = await User.findByEmail(email);

            if (user === null || !(await compare(password, user.password))) {

                res.status(401).json({ message: 'Auth failed' });

            } else {

                res.status(200).json({ message: 'Auth successful' });

            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
