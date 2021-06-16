module.exports = {
    /**
    * middleware generator that gets a schema in paramters. the middleware generated will validate the req.body
    * to make sure that the body complies to the schema constraints
    * 
    * @param {object} schema - JOI schema
    * @returns 400 if body is not valid
    * @next on success
    */
    validateBody: (schema) => (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            res.status(400).json({ message: error.message });
        } else {
            next();
        }
    }
}