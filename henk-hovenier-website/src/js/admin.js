// file voor alle dingen die admins zouden moete kunnen aanpassen
// zoals prijs per uur etc

export let pricePerHour = 25
export let totaal = pakket.duur * pricePerHour;

export function splitIntoDays(hours) {
  let days = []
  let remaining = hours

  while (remaining > 0) {
    const hoursToday = Math.min(8, remaining)
    days.push(hoursToday)
    remaining -= hoursToday
  }

  return days
}
