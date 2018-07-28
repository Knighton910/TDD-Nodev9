const expect = require('chai').expect;
const rewire = require('rewire');
const sinon = require('sinon');

const order = rewire('../lib/order');


describe('Ordering items', () => {

    beforeEach(() => {
       this.testData = [
           {sku: 'AAA', qty: 10},
           {sku: 'BBB', qty: 3},
           {sku: 'CCC', qty: 4}
       ];

       this.console = {
           log: sinon.spy()
       };

       this.warehouse = {
           packageAndShip: sinon.stub().yields(10101010)
       };

       order.__set__('inventoryData', this.testData);
       order.__set__('console', this.console);
       order.__set__('warehouse', this.warehouse);
    });

    it('Logs \'item not found\'', () => {
        order.orderItem('ZZZ', 10);
        expect(this.console.log.calledWith('Item - ZZZ not found')).to.equal(true);
    });

    it('order an item when there are enough in stock', (done) => {
        const _this = this;

        order.orderItem('CCC', 3, () => {
            expect(_this.console.log.callCount).to.equal(2);
            done();
        });
    });

    describe('Warehouse interaction', () => {
        beforeEach(() => {
            this.cb = sinon.spy();
            order.orderItem('CCC', 2, this.cb);
        });

        it('receives a tracking number', () => {
            expect(this.cb.calledWith(10101010)).to.equal(true);
        });
        it('calls packageAndShip with the correct sku and quantity', () => {
            expect(this.warehouse.packageAndShip.calledWith('CCC', 2)).to.equal(true);
        });
    })
});