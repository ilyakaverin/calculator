const calculation = require('../src/service.js').default
const {percent, sqrt} = require('../src/service.js')




test('calculation', () => {
    
    expect(calculation('2+2')).toEqual('4');
    expect(calculation('20+2')).toEqual('22');
    expect(calculation('100-10')).toEqual('90');
    expect(calculation('100/10')).toEqual('10');
    expect(calculation('100x10')).toEqual('1000');
    expect(calculation('0.2+0.4')).toEqual('0.60');
    expect(calculation('2+(-22)')).toEqual('-20');
    expect(calculation('100/(-2)')).toEqual('-50');
    expect(calculation('-25+25')).toEqual('0');
    expect(calculation('((')).toEqual('incorrect input');
    expect(calculation('-2+(-6.5)')).toEqual('-8.50');
    expect(calculation('-2+25')).toEqual('23');
    expect(calculation('-2-2')).toEqual('-4');

})
test('percentage', () => {
    expect(percent('50-5')).toEqual('50-2.5');
    expect(percent('50-5')).toEqual('50-2.5');
    expect(percent('0.6-1')).toEqual('0.6-0.006');
})
test('sqrt', () => {
    expect(sqrt('4')).toEqual('2');
    expect(sqrt('50')).toEqual('7.07');
})