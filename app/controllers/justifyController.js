const { justifyText } = require('../services/justify');

module.exports = {

    /**
     * middleware that justifies text and send it back
     * @param {object} req - request 
     * @param {object} res - response
     */

    handleJustify: (req, res) => {
        const words = res.locals.words;
       
        const justifiedText = justifyText(words);
        res.setHeader('content-type', 'text/plain');
        res.send(justifiedText);
    },
}