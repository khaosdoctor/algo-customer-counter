export function computePenalty(log, closing) {
  const inputParsed = log.split(' ')
  let penalty = 0

  for (const [index, consumerShopped] of inputParsed.entries()) {
    if (index + 1 <= closing && consumerShopped === 'N') {
      penalty++
    }

    if (index + 1 > closing && consumerShopped === 'Y') {
      penalty++
    }
  }
  return penalty
}

export function findBestClosingTime(log) {
  const size = structuredClone(log).split(' ').length
  let penaltyTracker = {
    closing: Infinity,
    penalty: Infinity,
  }

  for (let i = 0; i < size + 1; i++) {
    const penalty = computePenalty(log, i)
    if (penalty < penaltyTracker.penalty) {
      penaltyTracker = {
        closing: i,
        penalty,
      }
    }
  }

  return penaltyTracker.closing
}

export function findBestClosingTimes(logs) {
  const lines = logs.split('\n')
  const bestClosingTimes = []
  for (const line of lines) {
    const chars = line.split(' ')
    let began = false
    let end = false
    let log = ''
    for (const char of chars) {
      switch (char) {
        case 'BEGIN':
          began = true
          log = ''
          end = false
          continue
        case 'END':
          end = true
          if (log.length === 0 || !began) continue
          bestClosingTimes.push(findBestClosingTime(log))
          log = ''
          began = false
          continue
        case 'Y':
        case 'N':
          if (!began) continue
          log += `${char} `
          continue
      }
    }
  }
  return bestClosingTimes
}
