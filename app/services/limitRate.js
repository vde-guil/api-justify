// npm imports

const redis = require('redis');


const { promisify } = require('util');

// we open a connection to the redis servers
let client;

// we check if we are in production or in local development
if (process.env.REDIS_URL) {
    client = redis.createClient(process.env.REDIS_URL);
} else {
    client = redis.createClient();
}

// express redi client doesn't support async/await. We can user promisify utils to force it.
const asyncClient = {
    get: promisify(client.get).bind(client),
    exists: promisify(client.exists).bind(client),
    setex: promisify(client.setex).bind(client),
    set: promisify(client.set).bind(client),
};

/**
 * express middleware that will make sure the user doesn't exceed the daily limit of 8000 words every 24h on the route it is applied to
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 * @returns - will respond with status 402 if daily limit exceeded or 
*/


/**
 * middleware that check if the word rate limit has been exceeded for the user, sends an error or updates
 * the current user word count
 * @param {object} req - request 
 * @param {object} res - response
 * @param {*} next 
 */
const limitRate = async (req, res, next) => {

    // i get the number of words from the words array create in previous middleware (cleanTextToJustify)
    const currentWordCount = res.locals.words.length;
    const userEmail = res.locals.user.email;

    // the format of the redis key storing the word count for a user is "justify:userEmail" (the Email is unique, we made sure of that)
    const key = 'justify:' + userEmail;

    try {

        // we check if the key already exists in base or has not expired
        const exists = await asyncClient.exists(key);

        // case the doesn't exists or has expired, we can set/reset it with another expiry time of 24h 
        // and the number of word of our current text and move to the next middleware
        if (!exists) {

            await asyncClient.setex(key, process.env.PEREMPTION, currentWordCount);

            next();

        } else {
            // else the key is present 
            // we get the number of word the api already processed
            const priorCount = await asyncClient.get(key);

            // we add it to the current count
            const newCount = +priorCount + currentWordCount;

            // if the new count exceeds the limit, we respond with a 402 error
            if (newCount > process.env.DAILY_WORD_RATE) {

                res.status(402).json({ message: 'Payment Required' });

            } else { 
                // Else we set the value to the newCount without resetting the expiry timer
                // and move to the next middleware
                await asyncClient.set(key, newCount, 'KEEPTTL');
                next();

            }

        }
    } catch (error) { // if something unexpected happens with the redis server
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    limitRate,
};