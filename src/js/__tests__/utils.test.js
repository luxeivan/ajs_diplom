import { calcTileType } from '../utils';

test('utils.calcTileType()', () => {
    const result = { 0: '', 1: '', 7: '', 8: '', 15: '', 56: '', 57: '', 63: '', };
    for (var key in result) {
        result[key] = calcTileType(Number(key), 8);
    }
    const tobe = { 0: 'top-left', 1: 'top', 7: 'top-right', 8: 'left', 15: 'right', 56: 'bottom-left', 57: 'bottom', 63: 'bottom-right', }
    expect(result).toEqual(tobe);
});
