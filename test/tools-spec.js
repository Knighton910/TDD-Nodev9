const expect = require('chai').expect;
const tools = require('../lib/tools');
const nock = require('nock');

describe('Tools', () => {
    describe('printName()', () => {
        it('should print the last name first', () => {
            let results = tools.printName({ first: ' kel', last: 'kni,'});

            expect(results).to.equal('kni, kel');
        });
    });

    describe('loadWiki()', () => {

        before(() => {
            nock('https://en.wikipedia.org')
                .get('/wiki/Abraham_Lincoln')
                .reply(200, 'Mock Abraham Lincoln Page');
        });

        it('Load Abraham Wiki', (done) => {
            tools.loadWiki({ first: 'Abraham', last: 'Lincoln'}, html => {
                expect(html).to.equal('Mock Abraham Lincoln Page');
                done();
            });
        });
    })
});