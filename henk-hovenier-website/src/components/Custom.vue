<template>
    <div class="melding" :class="[{ show: meldingZichtbaar }, meldingType]">
  {{ meldingTekst }}
</div>
    <div class="full">
        <div class="left">
            <h2>Custom offers</h2>
            

            <Calendar v-model="geselecteerdeDatum" :availability="{}" />

        </div>

    <div class="full-opdracht">
        <div class="custom-opdracht">
            <h2>Custom opdracht</h2>

            <!-- Oppervlaktes en lengtes -->
            <!-- <div class="form-group">
                <label>Gras oppervlakte (m²)</label>
                <input type="number" v-model.number="form.grasOppervlakte" min="0" required/>
            </div>

            <div class="form-group">
                <label>Tegel oppervlakte (m²)</label>
                <input type="number" v-model.number="form.tegelOppervlakte" min="0" required/>
            </div>

            <div class="form-group">
                <label>Heg lengte (meter)</label>
                <input type="number" v-model.number="form.hegLengte" min="0" required/>
                </div> -->

            <!-- Extra opties -->
            <h3>Extra opties</h3>
                <div class="checkbox-group">
                <label><input type="checkbox" v-model="form.afvoer" required/> Afvoeren groen afval (+ €15.00)</label>
                <label><input type="checkbox" v-model="form.bemesting" required/> Bemesting (+ €7.50)</label>
                <label><input type="checkbox" v-model="form.onkruid" required/> Onkruidbehandeling (+ €10.00)</label>
            </div>

            <button @click="berekenOfferte">Bereken offerte</button>

            <div v-if="resultaat" class="resultaat">
                <h3>Totaalprijs: € {{ resultaat.totaalPrijs }}</h3>
            </div>
            </div>

  <div class="confirm">
    <h2>Alles naar wens?</h2>
    <h3>Besvestig uw opdracht:</h3>
    <p>Datum: {{ geselecteerdeDatum }}</p>
    <button @click="bevestigOpdracht">Bevestig</button>
    <button @click="annuleerOpdracht">Annuleer</button>
  </div>

    </div>

    </div>
</template>

<script setup>
import { ref } from "vue";
import { calculateQuote } from "../js/functions.js"; 
import Calendar from "./Calendar.vue";

const form = ref({
  tuinOppervlakte: null,
  grasOppervlakte: null,
  tegelOppervlakte: null,
  hegLengte: null,
  afvoer: false,
  bemesting: false,
  onkruid: false
});

const resultaat = ref(null);

// bereken offerte op basis van ingevoerde data
function berekenOfferte() {
  console.log("Customer input:", form.value);

  const quote = calculateQuote(form.value);
  resultaat.value = quote;
}

const geselecteerdeDatum = ref(null); // beginwaarde niks

const meldingZichtbaar = ref(false); //meldingen
const meldingTekst = ref("");
const meldingType = ref("");

function bevestigOpdracht() {
//   alert("Opdracht bevestigd voor " + geselecteerdeDatum.value);
    if(input === null){
        return;
    } else{
        meldingType.value = "bevestigd";
        meldingTekst.value = "Uw opdracht is bevestigd voor " + geselecteerdeDatum.value + ".";
        meldingZichtbaar.value = true;

        // na 3 sec fadeout
        setTimeout(() => {
            meldingZichtbaar.value = false;
        }, 3000);
    }
}

function annuleerOpdracht() {
    if(input === null){
        return;
    } else{
        meldingType.value = "geannuleerd";
        meldingTekst.value = "Uw opdracht is geannuleerd. Vul het formulier opnieuw in.";
        meldingZichtbaar.value = true;

  // na 3 sec fade-out
  setTimeout(() => {
    meldingZichtbaar.value = false;
  }, 3000);

  form.value = {
    tuinOppervlakte: null,
    grasOppervlakte: null,
    tegelOppervlakte: null,
    hegLengte: null,
    afvoer: false,
    bemesting: false,
    onkruid: false
  };
  resultaat.value = null;
  geselecteerdeDatum.value = null;

    }
}
</script>

<style scoped>
.left{
    background-color: white;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 400px;
}
.melding{
    width: 50%;
    margin: 0 auto;
    margin-top: 20px;
    opacity: 0;
    text-align: center;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    font-weight: bold;
    transition: opacity 0.5s ease-in-out;
}.melding.show {
  opacity: 1; /* fade-in */
}.melding.geannuleerd{
    background-color: #ffdddd;
    border: 1px solid #ff5c5c;
    color: #a70000;
}.melding.bevestigd {
  background-color: #ddffdd;
  border: 1px solid #5cff5c;
  color: #00a700;
}
.full{
    min-height: 100vh;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
}
.confirm {
  border: 1px solid #ccc; 
  padding: 20px; 
  border-radius: 8px;
  background-color: white;
  width: 400px;
    margin: 20px auto;
    text-align: center;
}
.custom-opdracht { 
  border: 1px solid #ccc; 
  padding: 20px; 
  border-radius: 8px;
  background-color: white;
  width: 400px;
  margin: 20px auto;
}

.form-group {
  margin-bottom: 12px;
}

.checkbox-group label {
  display: block;
  margin: 4px 0;
}

button {
  margin-top: 15px;
  padding: 8px 16px;
  background: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.resultaat {
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
