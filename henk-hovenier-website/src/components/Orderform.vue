<template>
  <div class="order-container">
    <div class="wrapper">
      <button @click="router.push('/')" class="btn-back">← Terug</button>

      <header class="form-header">
        <h1>Order Gegevens</h1>
        <p style="color: #5a5a3d;">Vul je gegevens in en Henk neemt zo snel mogelijk contact met je op</p><br>
      </header>

      <div class="grid-layout">
        <aside class="card summary-card">
          <h3>Overzicht</h3>
          
          <div v-if="orderData.type === 'package'">
            <div class="item-name">{{ orderData.package.name }}</div>
            <div class="price-tag">€{{ orderData.package.price }},-</div>
          </div>

          <div v-else-if="orderData.tasks && orderData.tasks.length" class="custom-tasks">
            <div v-for="(task, index) in orderData.tasks" :key="index" class="task-item">
              <div class="item-name">{{ task.name }}</div>
              <div class="item-details">
                {{ task.quantity }} {{ task.unit }} × €{{ task.pricePerUnit.toFixed(2) }} = €{{ task.total.toFixed(2) }}
              </div>
            </div>
            <div v-if="orderData.total" class="total-section">
              <span>Totaal:</span>
              <span class="price-tag">€{{ orderData.total.toFixed(2) }}</span>
            </div>
          </div>
          <div class="disclaimer">
            Dit is een indicatieve prijs. De definitieve offerte ontvang je na beoordeling door Henk.
          </div>
        </aside>

        <main class="card form-card">
          <form @submit.prevent="handleSubmit">
            
            <section class="form-section">
              <h3>Persoonlijke Gegevens</h3>
              <div class="input-grid">
                <div class="form-group">
                  <label>Naam *</label>
                  <input v-model="formData.name" type="text" placeholder="Je volledige naam" required />
                </div>
                <div class="form-group">
                  <label>Email *</label>
                  <input v-model="formData.email" type="email" placeholder="je@email.nl" required />
                </div>
                <div class="form-group full-width">
                  <label>Telefoonnummer *</label>
                  <input v-model="formData.phone" type="tel" placeholder="06-12345678" required />
                </div>
              </div>
            </section>

            <section class="form-section">
              <h3>Adres</h3>
              <div class="form-group">
                <label>Straat en huisnummer *</label>
                <input v-model="formData.address" type="text" placeholder="Tuinstraat 123" required />
              </div>
              <div class="input-grid">
                <div class="form-group">
                  <label>Postcode</label>
                  <input v-model="formData.postalCode" type="text" placeholder="1234 AB" />
                </div>
                <div class="form-group">
                  <label>Plaats</label>
                  <input v-model="formData.city" type="text" placeholder="Amsterdam" />
                </div>
              </div>
            </section>

            <section class="form-section">
              <h3>Gewenste Datum</h3>
                <!-- <Calendar v-model="formData.preferredDate" :availability="{}" /> -->
              <p class="helper-text">De definitieve planning wordt door Henk bevestigd.</p>
            </section>

            <section class="form-section">
              <label>Opmerkingen (optioneel)</label>
              <textarea v-model="formData.notes" rows="4" placeholder="Bijzonderheden..."></textarea>
            </section>
            <button type="submit" class="btn-submit" :disabled="loading">
              <span v-if="loading" class="spinner"></span>
              <span v-else>Offerte Verzenden</span>
            </button>
          </form>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { saveOrder } from '../js/functions.js';
import Calendar from './Calendar.vue';

const router = useRouter();

const orderData = ref({ type: 'custom', tasks: [], total: 0 });
const formData = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  postalCode: '',
  city: '',
  preferredDate: '',
  notes: ''
});
const loading = ref(false); 

const minDate = new Date().toISOString().split('T')[0];

onMounted(() => {
  const data = localStorage.getItem('currentOrder');
  if (data) {
    orderData.value = { ...orderData.value, ...JSON.parse(data) };
  }
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    const fullOrder = {
      ...orderData.value,
      customer: formData.value,
      status: 'pending'
    };
    saveOrder(fullOrder);
    alert('Offerte verzonden! Henk neemt contact met je op.');
    localStorage.removeItem('currentOrder');
    router.push('/');
  } catch (error) {
    alert('Er is iets misgegaan. Probeer het opnieuw.');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.order-container {
  min-height: 100vh;
  background: #f8f6f0;
  padding: 20px;
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.disclaimer{
    font-size: 0.9rem;
    color: #2d3319;
    background-color: #f9f5ee;
    margin-top: 15px;
    padding: 10px;
    border-radius: 5px;
}

.btn-back {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 5px 10px;

}.btn-back:hover {
    background-color: #4a7c2c;
    color: white;
    border-radius: 5px;
    padding: 5px 10px;
    transition: 0.2s ease-in-out;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

.card {
  background: white;
  border-radius: 8px;
  border: 1px solid #eee;
  padding: 20px;
}

.summary-card {
  height: fit-content;
}

.task-item {
  margin-bottom: 10px;
}

.total-section {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 2px solid #4caf50;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.input-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.full-width {
  grid-column: 1 / -1;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-submit {
  width: 100%;
  background: #4a7c2c;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
}

.btn-submit:disabled {
  background: #ccc;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>