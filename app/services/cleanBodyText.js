/**
 * middleware that cleans the text from the body and turns it into an array of word.
 * It passes it to the next middleware through res.locals.
 * If the text is empty or too short, responds with a 400 error message
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */


const cleanTextToJustify = (req, res, next) => {

    // We remove the extra spaces and carriage return 
    const cleanedText = req.body.replace(/[\s\n]+/g, ' ').trim();

    // if the text is too short, responds with an error and stop execution
    if (cleanedText.length < 80) {
        res.status(400).json({ message: 'text too small' });
        return;
    }

    // cleaned text is transformed to an array of words and passed to the next middleware
    const words = cleanedText.split(' ');

    res.locals.words = words;
    next();
}

module.exports = {
    cleanTextToJustify
};