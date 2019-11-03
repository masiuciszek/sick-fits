import formatMoney from '../lib/formatMoney';

describe('dormatMoney function', () => {
  it('it works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('£0.01');
    expect(formatMoney(10)).toEqual('£0.10');
    expect(formatMoney(9)).toEqual('£0.09');
    expect(formatMoney(40)).toEqual('£0.40');
  });
  it('leavs cents off for whole pound', () => {
    expect(formatMoney(5000)).toEqual('£50');
    expect(formatMoney(100)).toEqual('£1');
    expect(formatMoney(500000)).toEqual('£5,000');
  });
});
