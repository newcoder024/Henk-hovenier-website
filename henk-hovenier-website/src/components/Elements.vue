<template>
    <div class="elements">
        <div v-for="(element, index) in pakketData" :key="index" class="element" :class="{ selected: geselecteerd === index }" @click="selectElement(index)">
        <h3>{{ element.naam }}</h3>
        <p>{{ element.beschrijving }}</p>
        <p>Prijs: €{{ element.prijs }}</p>
        </div>
    </div>

</template>
<script setup>
import { ref } from "vue";
import pakketData from '../data/pakket.json';

const geselecteerd = ref(null);

const emit = defineEmits(["selected"]);

function selectElement(index) {
  geselecteerd.value = index;
  emit("selected", pakketData[index]);
}
</script>
<style scoped>
.element {
  cursor: pointer;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: 0.2s;
}

.element:hover {
  background: #f5f5f5;
}

.element.selected {
  border-color: #4caf50;
  background: #e8ffe8;
}
</style>