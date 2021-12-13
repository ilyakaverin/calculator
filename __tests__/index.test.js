import calculation, { percent, sqrt } from '../src/service';



test('calculation', () => {
    
    expect(calculation('2+2')).toEqual(4);
    expect(calculation('20+2')).toEqual(22);
    expect(calculation('100-10')).toEqual(90);
    expect(calculation('100/10')).toEqual(10);
    expect(calculation('100x10')).toEqual(1000);
    expect(calculation('0.2+0.4')).toEqual('0.60');
    expect(calculation('2+(-22)')).toEqual(-20);
    expect(calculation('100/(-2)')).toEqual(-50);

    expect(percent('50-5')).toEqual('50-2.5');
    expect(percent('50-5')).toEqual('50-2.5');
    expect(percent('0.6-1')).toEqual('0.6-0.006');
    expect(sqrt('4')).toEqual('2');
    expect(sqrt('50')).toEqual('7.07');

    
    
})