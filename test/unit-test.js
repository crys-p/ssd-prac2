let expect;
before(async () => {
  ({ expect } = await import('chai'));
});
const { server, getModuleMessage } = require('../server.js');

describe('getModuleMessage', function() {
  it('should return SSD message for SSD', function() {
    expect(getModuleMessage('SSD')).to.equal('Ding ding! SSD is beter!');
  });
  it('should return ITP message for ITP', function() {
    expect(getModuleMessage('ITP')).to.equal('Boooo! ITP is the worst!');
  });
  it('should return ITP message for other values', function() {
    expect(getModuleMessage('Other')).to.equal('Boooo! ITP is the worst!');
  });
  
  after(() => {
    server.close();
  });
});