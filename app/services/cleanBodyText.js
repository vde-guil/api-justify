const cleanTextToJustify = (req, res, next) => {
    

    const cleanedText = req.body.replace(/[\s\n]+/g, ' ').trim();

    if (cleanedText.length < 80) {
        res.status(400).json({message: 'text too small'});
        return ;
    }

    const words = cleanedText.split(' ');

    res.locals.words = words;
    next();
}

module.exports = {
    cleanTextToJustify
};