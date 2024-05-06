// function extent(nums: number[]) {
//     let min, max;
//     for (const num of nums) {
//         if (!min) {
//             min = num;
//             max = num;
//         } else {
//             min = Math.min(min, num);
//             max = Math.max(max, num);
//         }
//     }
//     return [min, max];
// }

function extent(nums: number[]) {
    let result: [number, number] | null = null;
    for (const num of nums) {
        if (!result) {
            result = [num, num];
        } else {
            result = [Math.min(result[0], num), Math.min(result[1], num)];
        }
    }
    return result;
}

const [min, max] = extent([0, 1, 2])!;

const range = extent([0, 1, 2]);
if(range) {
    const [min, max] = range;
    const span = max - min;
}
