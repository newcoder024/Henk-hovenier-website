import pakketData from '../pakket.json';

let orders = []; // bestellingen tijdelijk opslaan

export function loadPackages() {
  return pakketData; // retourneert JSON array
}

export function createOrder(orderData) {
  const pkg = pakketData.find(p => p.id === orderData.packageId); 
  if (!pkg) throw new Error("Pakket niet gevonden");

  let dagenWerk = 1;
  if (pkg.duur >= 8) {
    dagenWerk = 2;
  }

  const newOrder = {
    ...orderData,
    orderId: Date.now(), // unieke ID  
    packageId: pkg.id,
    pakket: pkg.naam,
    beschrijving: pkg.beschrijving,
    prijs: pkg.prijs,
    uren: pkg.duur,
    dagenWerk: dagenWerk,
  };

  orders.push(newOrder);
  console.log("Nieuwe bestelling:", newOrder);
  return newOrder;
}

export function getOrders() {
  return orders;
}

// Hulpfunctie voor dagen verdelen
export function splitIntoDays(hours) {
  let remaining = hours;
  const result = [];
  while (remaining > 0) {
    result.push(Math.min(8, remaining));
    remaining -= 8;
  }
  return result;
}