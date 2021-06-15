const { justifyText } = require('../services/justify');

module.exports = {
    handleJustify: (req, res) => {
        const words = res.locals.words;
       
        const justifiedText = justifyText(words);
        res.send(justifiedText);
    },
}