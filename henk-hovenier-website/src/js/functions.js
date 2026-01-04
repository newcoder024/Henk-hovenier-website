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

  orders.push(newOrder);
  console.log("Nieuwe bestelling:", newOrder);
  return newOrder;
}

export function getOrders() {
  return orders;
}

// hulpfunctie voor dagen verdelen
export function splitIntoDays(hours) {
  let remaining = hours;
  const result = [];
  while (remaining > 0) {
    result.push(Math.min(8, remaining));
    remaining -= 8;
  }
  return result;
}

export function loadRates(){ // leest tarieven uit rates.json
  return ratesData;
}

export function calculateQuote(customInput){ 
  const rates = loadRates();
  let total = 0; // totaal prijs begint met 0

  // bereken prijs op basis van wat is ingevoerd. bvb 2 m2 gras * prijs_per_m2_gras 
  // dat rekent de prijs uit en telt die bij total op
  if(customInput.grasOppervlakte){
    total += customInput.grasOppervlakte * rates.prijs_per_m2_gras;
  }
  if(customInput.tegelOppervlakte){
    total += customInput.tegelOppervlakte * rates.prijs_per_m2_tegels;
  }
  if(customInput.hegLengte){
    total += customInput.hegLengte * rates.prijs_per_meter_heg;
  }
  if(customInput.extraOpties){
    customInput.extraOpties.forEach(optie => {
      const optiePrijs = rates.prijs_extra_opties[optie];
      if(optiePrijs){
        total += optiePrijs;
      }
    });
  }

  return {
    totaalPrijs: total.toFixed(2)
  };
  // toFixed(2) zorgt dat er max 2 decimalen worden getoond ipv 5,0003 lol
}