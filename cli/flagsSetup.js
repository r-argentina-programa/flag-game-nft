import fs from 'fs';
import getPixels from 'get-pixels';

function rgbToHex(r, g, b) {
    const hexBase = 16;
    r = r.toString(hexBase);
    g = g.toString(hexBase);
    b = b.toString(hexBase);

    if (r.length === 1) r = '0' + r;
    if (g.length === 1) g = '0' + g;
    if (b.length === 1) b = '0' + b;

    return '#' + r + g + b;
}

function getFlagMap(flag) {
    return new Promise((resolve) => {
        const path = `../shared/flags/270x180/${flag}.png`;
        getPixels(path, function (err, pixels) {
            const map = [];
            for (let y = 0; y < pixels.shape[1]; y++) {
                for (let x = 0; x < pixels.shape[0]; x++) {
                    const r = pixels.get(x, y, 0);
                    const g = pixels.get(x, y, 1);
                    const b = pixels.get(x, y, 2);
                    const hex = rgbToHex(r, g, b);

                    map[y] = map[y] || [];
                    map[y][x] = {color: hex, isVisible: false};
                }
            }
            resolve(map);
        });
    });
}

export async function generateFlagMap(flag) {
    const map = await getFlagMap(flag);
    const flagString = JSON.stringify(map, null, 2);
    const path = `../shared/data/${flag}.json`;
    fs.writeFileSync(path, flagString);
    console.log(flag, 'flag map written to', path);
}
