const { justifyText } = require('../services/justify');

module.exports = {

    /**
     * middleware that justifies text and send it back
     * @param {*} req 
     * @param {*} res 
     */

    handleJustify: (_, res) => {
        const words = res.locals.words;
       
        const justifiedText = justifyText(words);
        res.send(justifiedText);
    },
}