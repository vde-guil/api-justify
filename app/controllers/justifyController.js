const { justifyText } = require('../services/justify');

module.exports = {
    handleJustify: (req, res) => {
        const text = req.body;

        const justifiedText = justifyText(text);
        res.send(justifiedText);
    },
}