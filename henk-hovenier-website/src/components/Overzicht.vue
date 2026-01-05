<template>
    <div class="overzicht">
        <h2>Overzicht van bestellingen</h2>
        <div v-if="orders.length === 0" class="no-orders">
            Geen orders gevonden.
        </div>
        <div v-else class="orders-list">
            <div v-for="order in orders" :key="order.id" class="order-card">
                <div class="status" :class="order.status || 'in behandeling'">{{ order.status || 'in behandeling' }}</div>
                <h3>Order #{{ order.id }}</h3>
                <p style="font-size: 14px;">{{ new Date(order.datumAangemaakt).toLocaleDateString() }}</p><br>
                <div class="order-details">
                    <div class="left">
                        <p><span class="subtext">Klant: </span><br>{{ order.customer.name }}</p><br>
                        <p><span class="subtext">Adres:</span><br>{{ order.customer.address }} <br> <span class="subtext2">{{ order.customer.postalCode }} {{ order.customer.city }}</span></p>
                    </div>
                    <div class="right">
                        <p><span class="subtext">Contact:</span><br> {{ order.customer.phone }} <br> <span class="subtext2"> {{ order.customer.email }} </span></p><br>
                        <p><span class="subtext">Gewenste datum: </span></p> <!-- hier komt welke datum de klant wil voor taak -->
                        
                    </div>
                </div>
                <hr>
                <p class="subtext">Order details</p>
                    <div v-if="order.tasks">
                        <h4 class="subtext">Taken:</h4>
                        <ul>
                            <li v-for="task in order.tasks" :key="task.name" style="list-style: none;">
                                {{ task.name }}: {{ task.quantity }} {{ task.unit }} - €{{ task.total }}
                            </li>
                        </ul><br>
                    </div>
                <p><span class="subtext" style="font-size: 18px;">Totaal:</span> <span style="color: green; font-size: 18px;"> €{{ order.total || 'N/A' }} </span></p>
                <div class="status-buttons" v-if="order.status === 'pending'">
                    <button @click="updateStatus(order.id, 'completed')" class="btn-complete">Markeer als compleet</button>
                    <button @click="updateStatus(order.id, 'rejected')" class="btn-reject">Wijs af</button>
                </div>
                <div class="status-buttons" v-else-if="order.status === 'completed'">
                    <button @click="updateStatus(order.id, 'pending')" class="btn-pending">Zet terug naar 'in behandeling'</button>
                </div>
                <div class="status-buttons" v-else-if="order.status === 'rejected'">
                    <button @click="updateStatus(order.id, 'pending')" class="btn-pending">Zet terug naar 'in behandeling'</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getOrders } from '../js/functions.js';

const orders = ref([]);
orders.value = getOrders();

const updateStatus = (orderId, newStatus) => {
    const orderIndex = orders.value.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
        orders.value[orderIndex].status = newStatus;
        // Update localStorage
        localStorage.setItem('tuin_orders', JSON.stringify(orders.value));
        console.log(`Order ${orderId} status updated to ${newStatus}`);
    }
};
</script>

<style scoped>
.orders-list{
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.order-details{
    display: flex;
    gap: 30px;
}
.subtext{
    color: #2d3319;
    font-weight: 450;
}
.subtext2{
    color: #2d3319;
    font-size: 14px;
}
.right{
    float: right;
}
.overzicht {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    min-height: 80vh;
}

p{
    margin-bottom: 5px;
}
hr{
    margin: 5px;
    border: 1px solid green;
}

.order-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    background: #ffffff;
    position: relative;
}

.status {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px 10px;
    border-radius: 99px;
    font-size: 12px;
    font-weight: bold;
}

.status.pending {
    background: #fff9c2;
    color: #894b00;
}

.status.completed {
    background: #dcfce6;
    color: #016730;
}

.status.rejected {
    background: #ffe2e2;
    color:#9e0812;
}

.status-buttons {
    margin-top: 10px;
    display: flex;
    gap: 10px;
}

.btn-complete {
    background: #4caf50;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}

.btn-reject {
    background: #f44336;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}

.btn-pending {
    background: #ffeb3b;
    color: #333;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}
</style>