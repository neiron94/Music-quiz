export function getRandomSample(arr, n) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]]; // swap
    }
    return copy.slice(0, n);
}

export function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// TODO - rewrite to:
// Array.prototype.random = function() {
//     let index = Math.random()*this.length
//     return this[Math.floor(index)]
// }