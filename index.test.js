import assert from 'node:assert'
import { computePenalty, findBestClosingTime, findBestClosingTimes } from './index.js'

assert.strictEqual(computePenalty('Y Y Y Y', 0), 4)
assert.strictEqual(computePenalty('Y Y N Y', 0), 3)
assert.strictEqual(computePenalty('Y Y N Y', 2), 1)
assert.strictEqual(computePenalty('N N N Y', 2), 3)

// best time
assert.strictEqual(findBestClosingTime('Y Y Y Y'), 4)
assert.strictEqual(findBestClosingTime('Y Y N Y'), 2)
assert.strictEqual(findBestClosingTime('N N N N'), 0)
assert.strictEqual(findBestClosingTime('N Y N N'), 0)

// Brainstorming
console.log(findBestClosingTimes('BEGIN Y Y END\nBEGIN N N END'))
console.log(findBestClosingTimes('BEGIN BEGIN \nBEGIN N N BEGIN Y Y\n END N N END'))
console.log(findBestClosingTimes('BEGIN BEGIN BEGIN N N BEGIN Y Y END N N END'))
console.log(findBestClosingTimes('BEGIN BEGIN BEGIN N N BEGIN Y Y N Y N Y END N N END'))
console.log(findBestClosingTimes('BEGIN BEGIN BEGIN N N BEGIN Y Y END N N END'))
