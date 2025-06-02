/* Set up helping functions */
export function setUpUtils() {
    Array.prototype.randomSample = function (n) {
        const copy = this.slice();
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]]; // swap
        }
        return copy.slice(0, n);
    }

    Array.prototype.randomElement = function() {
        return this[Math.floor(Math.random() * this.length)];
    }
}
