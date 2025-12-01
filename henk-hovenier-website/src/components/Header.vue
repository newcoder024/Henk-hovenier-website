<template>
    <header>
    <h2 class="logo"><i class="fa-solid fa-leaf"></i> Groen en Gewoon doen</h2>

    <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/">Pakketten</router-link>
        <router-link to="/">Custom</router-link>
        <router-link to="/">Admin</router-link>
    </nav>

  </header>
</template>

<script>

</script>

<style scoped>
 header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  padding: 20px 40px;
  background-color: #508343;
  color: white;
  border-bottom: 1px solid #ddd;
  font-family: 'Poppins', sans-serif;
  position: relative; 
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
}

nav {
  display: flex;
  gap: 20px;
  cursor: pointer;
}

</style>
