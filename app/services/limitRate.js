const redis = require('redis');

const client = redis.createClient();

const { promisify } = require('util');

const asyncClient = {
    get: promisify(client.get).bind(client),
    del: promisify(client.del).bind(client),
    exists: promisify(client.exists).bind(client),
    setex: promisify(client.setex).bind(client),
    set: promisify(client.set).bind(client),
};

const limitRate = async (req, res, next) => {

    // i get the number of words from the words array create in previous middleware (cleanTextToJustify)
    const currentWordCount = res.locals.words.length;
    const userEmail = res.locals.user.email;

    const key = 'justify:'+userEmail;
   
    try {

        // the number of word treated is present in redis db under the key 'verify:(currentUserEmail)'
        const exists = await asyncClient.exists(key);
        
        // if the key doesn't exist, we can create an new entry with the number of word and an expiry duration
        // OR if the key is present but the value is null => mean the timer expired, we can set it to 0 + current word count
        if (!exists) {
    
            await asyncClient.setex(key, process.env.PEREMPTION, currentWordCount);
            next();
        } else {
            // if the key is present with a value, let's make sure the total count will < DAILY_WORD_RATE or we send an error 402
    
            const priorCount = await asyncClient.get(key);

            const newCount = +priorCount + currentWordCount;

            if (newCount > process.env.DAILY_WORD_RATE) {
                res.status(402).json({message: 'Payment Required'});
            } else {
                await asyncClient.set(key, newCount, 'KEEPTTL');
                next();
            }
    
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    limitRate,
};