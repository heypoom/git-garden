export function getTile(count: number) {
  if (count === 0) return require('./assets/0.svg')
  if (count >= 1 && count < 5) return require('./assets/1.svg')
  if (count >= 5 && count < 10) return require('./assets/2.svg')
  if (count >= 10 && count < 20) return require('./assets/3.svg')
  if (count >= 20 && count < 30) return require('./assets/4.svg')
  if (count >= 30 && count < 40) return require('./assets/5.svg')
  if (count >= 40) return require('./assets/6.svg')
}
