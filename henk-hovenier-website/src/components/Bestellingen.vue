<template>
  <div class="flex">
      <div class="order-form">
    <h2>Pakket bestellen</h2>

    <label>Naam:</label>
    <input v-model="form.name" type="text" required />

    <label>Adres:</label>
    <input v-model="form.address" type="text" required />

    <label>Telefoonnummer:</label>
    <input v-model="form.phone" type="tel" required />

    <label>Pakket:</label>
    <select v-model="form.packageId" >
      <option :value="null" disabled>Kies een pakket</option>
      <option v-for="p in packages" :key="p.id" :value="p.id">
        {{ p.naam }} - {{ p.duur }} uur werk
      </option>
    </select>

    

    <button @click="submitForm">Verstuur</button>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
  <div class="order-form">
<label>Datum:</label>
<Calendar v-model="form.date" :availability="availability" />

    <label>Tijd:</label>
    <input type="time" v-model="form.time" />
  </div>

  </div>
  

</template>

<script>
import Calendar from './Calendar.vue';
import { loadPackages, createOrder, getOrders } from '../js/functions.js';

export default {
  components: { Calendar },

  data() {
    return {
      packages: [ ],
      availability: {},
      form: {
        name: "",
        address: "",
        phone: "",
        packageId: null,
        date: "",
        time: "",
      },
      error: "",
    };
  },
  mounted() {
    this.packages = loadPackages(); // pakketten laden bij start
  },
  computed: {
    selectedPackage() {
      return this.packages.find(p => p.id === this.form.packageId);
    },
  },
  methods: {
    splitIntoDays(hours) {
      let remaining = hours;
      const result = [];
      while (remaining > 0) {
        result.push(Math.min(8, remaining));
        remaining -= 8;
      }
      return result;
    },
    checkAvailability() {
      this.error = "";
      if (!this.selectedPackage || !this.form.date) return;
      
      const hoursRequested = this.selectedPackage.duur;  // <- FIX
      const hoursToday = this.availability[this.form.date] || 0;
      
      if (hoursToday + hoursRequested > 8) {
        this.error = "Deze dag is volgeboekt, kies een andere datum.";
        this.form.date = "";
      }
    },
    submitForm() {
      try {
        if (!this.form.name || !this.form.address || !this.form.phone || !this.form.packageId || !this.form.date || !this.form.time) {
          this.error = "Vul alle velden in.";
          return;
        }
          this.checkAvailability();
        createOrder(this.form); // bestelling aanmaken
        alert("Bestelling verstuurd! (zie console)");
        // formulier resetten
        this.form = { name: "", address: "", phone: "", packageId: null, date: "", time: "" };
      } catch (err) {
        this.error = err.message;
      }
      
    },
    showOrders() {
      console.table(getOrders()); // alle bestellingen bekijken
    },
  },
};
</script>

<style scoped>
.flex{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;

}
select{
  color: black;
  height: 40px;
  appearance: none;

} 

.order-form {
  min-width: 300px;
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
}

.order-form h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.order-form label {
  display: block;
  margin-top: 1rem;
  font-weight: bold;
}

.order-form input,
.order-form select {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.3rem;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
  color: black;
}

.order-form button {
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.7rem;
  background-color: #4CAF50;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.order-form button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  margin-top: 0.5rem;
  font-weight: bold;
  text-align: center;
}
</style>