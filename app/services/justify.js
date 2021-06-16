const MAX_LINE_LENGTH = 80;

const LinkedList = require('./LinkedList/LinkedList');
const {EOL} = require('os');

/**
 * function part of the justify service that will fill a line with spaces until the line reaches the
 * MAX_LINE_LENGTH
 * @param {number} missingSpaceNbr 
 * @param {array<LinkNode>} spaceNodes 
 */
const addMissingSpaces = (missingSpaceNbr, spaceNodes) => {

    let index = 0;
    // if there is more missing spaces than spaces Nodes present in the line, add a second space to every space Node available ...
    if (missingSpaceNbr >= spaceNodes.length) {
        for (; index < spaceNodes.length; index++) {
            spaceNodes[index].word += ' ';
        }
    }
    // then add the remaining spaces randomly (or add them randomly if there are )
    for (; index < missingSpaceNbr; index++) {
        const randomIndex = Math.round(Math.random() * (spaceNodes.length - 1))
        spaceNodes[randomIndex].word += ' ';
    }

}

/**
 * function part of the justify service that will add a word to the linked list and a space,
 * and store the reference of the space in an array
 * @param {LinkedList} line 
 * @param {string} word 
 * @param {array} spaceTab 
 */
const addWordToLine = (line, word, spaceTab) => {
    // add the current word, then a trailing space to the line structure
    line.add(word);
    line.add(' ');

    // then put a reference to the trailing spaceNode in an array for fast access later
    const spaceNode = line.last;
    spaceTab.push(spaceNode);
}

/**
 * function that takes an array of words and justifies it in lines of MAX_LINE_LENGTH length
 * @param {array<string>} words 
 * @returns 
 */
const justifyText = (words) => {

    // initialisation of variables
    const line = new LinkedList(); // linked list representing the current line
    const spaceNodes = []; // array to store the space nodes of the current line for fast access to finish justifying
    const result = []; // array to store each line as a string

    // we go through each word of our paragraph
    for (let i = 0; i < words.length; i++) {
        const curWord = words[i];

        // if the current word fits within our justify constraint in the line, we add it in our linked list structure
        if ((line.totalChars + curWord.length) + 1 <= MAX_LINE_LENGTH + 1) {
            addWordToLine(line, curWord, spaceNodes)

            // else we finalise justifying the current line by adding the missing space to fit our constraint, store it in the result and start filling the new line
        } else {
            // remove last trailing space because it's an end of line space
            line.removeLast();
            spaceNodes.pop();

            // add spaces to justify the lines
            const spaceNbr = MAX_LINE_LENGTH - line.totalChars;

            addMissingSpaces(spaceNbr, spaceNodes)

            // store the line
            result.push(line.getLine());

            // clear the linked list and spaceNode array
            line.clear();
            spaceNodes.length = 0;

            // add the current word that didn't fit the previous line to new line
            addWordToLine(line, curWord, spaceNodes)
        }
    }
    // if there's still words in the line structure, add it to the results
    if (line.size() != 0) {
        line.removeLast();
        result.push(line.getLine());
    }

    return result.join(EOL);

};

module.exports = {
    justifyText
};