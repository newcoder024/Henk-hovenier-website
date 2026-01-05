<template>
  <footer class="site-footer">
    <div class="footer-col">
      <p class="footer-title">&copy; 2025 <i class="fa-solid fa-leaf"></i>Groen & Gewoon doen</p>
    </div>

    <div class="footer-col">
      <p class="footer-title">Voorwaarden</p>
    </div>

    <div class="footer-col">
      <p class="footer-title">020 - 123 4567</p>
      <p class="footer-p">contact@GroenDoen.nl</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "SiteFooter",
};
</script>

<style scoped>
footer {
  background-color: #2d5016;
  display: flex;
  color: #ffffff;
  text-align: left;
  padding: 20px 0;
  position: relative;
  flex-wrap: wrap;
  justify-content: space-between;
  border-top: 1px solid #e0e0e0;
  font-family: Arial, sans-serif;
  width: 100%; /* use container width to avoid horizontal scroll */
  box-sizing: border-box;
}

footer div {
  flex: 1 1 220px; /* responsive columns */
  max-width: 33%;
  padding: 0 20px;
  box-sizing: border-box;
}

.footer-title {
  font-size: 18px;
  margin-bottom: 15px;
  color: rgb(255, 255, 255);
  font-weight: bold;
  padding: 5px;
}

.footer-p {
  font-size: 16px;
  color: #ffffff;
  padding: 5px;
}
</style>
