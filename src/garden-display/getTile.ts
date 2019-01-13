export function getTile(count: number) {
  if (count === 0) return '/tiles/0.svg'
  if (count >= 1 && count < 5) return '/tiles/1.svg'
  if (count >= 5 && count < 10) return '/tiles/2.svg'
  if (count >= 10 && count < 20) return '/tiles/3.svg'
  if (count >= 20 && count < 30) return '/tiles/4.svg'
  if (count >= 30 && count < 40) return '/tiles/5.svg'
  if (count >= 40) return '/tiles/6.svg'
}
