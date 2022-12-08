export function formatTimestampToDateTime(timestamp: number): string {
  // форматирует timestamp в дату и время
  const date = new Date(timestamp * 1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${year}-${fillZero(month)}-${fillZero(day)} ${fillZero(hour)}:${fillZero(minute)}:${fillZero(second)}`
}

export function fillZero(num: number): string {
  // добавляет 0 перед числом, если оно меньше 10
  return num < 10 ? '0' + num : num.toString()
}

export function makeRound(value: any) {
  // правильное округление
  return Math.round((value + Number.EPSILON) * 100) / 100
}
