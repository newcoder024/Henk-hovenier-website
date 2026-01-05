<template>
  <p id="Comfirmed"></p>
<div class="full">
  <div>
            <!-- <h2>Custom offers</h2>
            <Calendar v-model="geselecteerdeDatum" :availability="{}" /> -->
            <h2>Beschikbare werkzaamheden:</h2>
            <div v-for="taak in beschikbareTaken" :key="taak.id" class="offerte-item">
          <div class="taak-info">
            <p><strong>{{ taak.naam }}</strong></p>
            <p class="subtext">€{{ taak.prijs.toFixed(2) }} per {{ taak.eenheid }}</p>
          </div>
          
          <button 
            @click="toggleTaak(taak)" 
            :class="{ 'btn-remove': isGeselecteerd(taak.id) }"
          >
            {{ isGeselecteerd(taak.id) ? 'Verwijder' : 'Toevoegen' }}
          </button>

        </div>
  </div>
<div>
        <div class="confirm">
          <h3>Je Custom Order</h3>
          
          <div v-if="geselecteerdeTaken.length === 0" class="empty-state">
            Selecteer werkzaamheden om te beginnen.
          </div>

          <div v-else>
            <div v-for="item in geselecteerdeTaken" :key="item.id" class="selected-item">
              <div class="item-header">
                <span>{{ item.naam }}</span>
                <button @click="verwijderTaak(item.id)" class="btn-icon">×</button>
              </div>
              <p class="subtext">Wij</p>
              
              <div class="item-calc">
                <label v-if="item.adjustable">Aantal {{ item.eenheid }}:</label>
                <input v-if="item.adjustable"
                  type="number" 
                  v-model.number="item.hoeveelheid" 
                  min="1" 
                  class="qty-input"
                />
                <span v-else>Eenmalig</span>
                <span class="item-total">€{{ (item.hoeveelheid * item.prijs).toFixed(2) }}</span>
              </div>
            </div>

            <div class="totaal-sectie">
              <span>Totaal:</span>
              <span class="totaal-prijs">€{{ totaalPrijs.toFixed(2) }}</span>
            </div>

            <button @click="bevestigOpdracht" class="btn-proceed">Verder naar gegevens</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { loadRates } from '../js/functions.js';
import { useRouter } from 'vue-router';
// moet meer functies laden uit functions.js, zoald voor de localstorage, zorgen dat 
// de bestellingen worden onthouden en geladen voor de admin, en de gegevens van de klant opslaan

// laad tarieven uit rates.json
const rates = loadRates();
const router = useRouter();

// wat kan de klant kiezen
const beschikbareTaken = [
  { id: 'gras', naam: 'Gras maaien', prijs: rates.prijs_per_m2_gras, eenheid: 'm²', adjustable: true },
  { id: 'tegels', naam: 'Betegelen', prijs: rates.prijs_per_m2_tegels, eenheid: 'm²', adjustable: true },
  { id: 'heg', naam: 'Heg snoeien', prijs: rates.prijs_per_meter_heg, eenheid: 'meter', adjustable: true },
  { id: 'afvoer groenafval', naam: 'Afvoer groenafval', prijs: rates.prijs_extra_opties.afvoer_groenafval, eenheid: 'keer', adjustable: false },
  { id: 'bemesting', naam: 'Bemesting', prijs: rates.prijs_extra_opties.bemesting, eenheid: 'keer', adjustable: false },
  { id: 'onkruidbehandeling', naam: 'Onkruidbehandeling', prijs: rates.prijs_extra_opties.onkruidbehandeling, eenheid: 'keer', adjustable: false },
];

// wat de klant heeft gekozen als array
const geselecteerdeTaken = ref([]);

// is de taak al geselecteerd
const isGeselecteerd = (id) => geselecteerdeTaken.value.some(t => t.id === id);

const toggleTaak = (taak) => {
  if (isGeselecteerd(taak.id)) {
    verwijderTaak(taak.id);
  } else {
    geselecteerdeTaken.value.push({
      ...taak,
      hoeveelheid: 1 // standaard waarde
    });
  }
};

const verwijderTaak = (id) => {
  geselecteerdeTaken.value = geselecteerdeTaken.value.filter(t => t.id !== id);
};

// berekening
const totaalPrijs = computed(() => {
  return geselecteerdeTaken.value.reduce((sum, item) => {
    return sum + (item.prijs * item.hoeveelheid);
  }, 0);
});

const bevestigOpdracht = () => {
  if (totaalPrijs.value === 0) {
    alert("Selecteer eerst werkzaamheden voordat je verder gaat.");
    return;
  }
  // Sla de order data op in localStorage voor Orderform
  const orderData = {
    type: 'custom',
    tasks: geselecteerdeTaken.value.map(item => ({
      name: item.naam,
      quantity: item.hoeveelheid,
      unit: item.eenheid,
      pricePerUnit: item.prijs,
      total: item.prijs * item.hoeveelheid
    })),
    total: totaalPrijs.value
  };
  localStorage.setItem('currentOrder', JSON.stringify(orderData));
  router.push('/orderform');
};
</script>

<style scoped>
.container {
  display: flex;
  gap: 20px;
  max-width: 1000px;
}

.full {
  display: flex; 
  justify-content: center;
  align-items: flex-start; 
  gap: 40px;
  max-width: 95vw;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100%;
}
.confirm{
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
    background: white;

}
.offerte-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #eee;
  margin-bottom: 10px;
  border-radius: 8px;
  background: white;
}

.subtext {
  color: #666;
  font-size: 0.85rem;
}

.selected-item {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  text-align: left;
}

.item-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.item-calc {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}

.qty-input {
  width: 60px;
  padding: 4px;
}

.totaal-sectie {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 2px solid #4caf50;
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  font-weight: bold;
}

.btn-remove {
  background-color: #c82525;
}

.btn-proceed {
  width: 100%;
  margin-top: 20px;
  background-color: #4b7c2d;
  font-size: 1.1rem;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}
.btn-icon {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}.btn-icon:hover {
  color: #c82525;
}
button{
  cursor: pointer;
  background-color: #4b7c2d;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
}

#Comfirmed{
  font-size: 1.5rem;
  font-weight: bold;
  color: #4b7c2d;
  text-align: center;
  margin-top: 20px;
}

.item-total {
  margin-left: auto;
  color: #4b7c2d;
}
</style>