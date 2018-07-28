const https = require('https');

module.exports = {
    printName(person) {
        return person.last + person.first;
    },
    loadWiki(person, cb) {
        let url = `https://en.wikipedia.org/wiki/${person.first}_${person.last}`;

        https.get(url, res => {
            let body = '';
            res.setEncoding('UTF-8');

            res.on('data', chunk => {
                body += chunk;
            });
            res.on('end', () => {
                cb(body);
            });
        })
    }
};
