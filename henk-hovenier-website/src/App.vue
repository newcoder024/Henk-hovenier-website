<script setup>
import SiteHeader from './components/Header.vue';
// import Bestellingen from './components/Bestellingen.vue';
import SiteFooter from './components/footer.vue';
// import Custom from './components/Custom.vue';
import { RouterView } from 'vue-router';

</script>

<template>
  <SiteHeader />
  <!-- <Bestellingen /> -->
  <!-- <Custom /> -->

  <RouterView/>
  <SiteFooter />
</template>

<style scoped>
template{
  min-height: 100vh;
}
</style>
