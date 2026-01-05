import pakketData from '../data/pakket.json';
import ratesData from '../data/rates.json';

// localstorage voor bestellingen onthouden
let orders = JSON.parse(localStorage.getItem('tuin_orders')) || [];

export function loadPackages() {
  return pakketData; // retourneert JSON array
}

export function saveOrder(orderData) {
  const newOrder = {
    id: Date.now(),
    datumAangemaakt: new Date().toISOString(),
    ...orderData
  };
  orders.push(newOrder);
  localStorage.setItem('tuin_orders', JSON.stringify(orders));
  console.log("Nieuwe bestelling opgeslagen:", JSON.stringify(newOrder, null, 2)); // Als geformatteerde JSON voor debugging
  return newOrder;
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

  return saveOrder(newOrder); // Gebruik saveOrder voor consistentie
}

export function getOrders() {
  return orders;
}

export function loadRates(){ // leest tarieven uit rates.json
  return ratesData;
}