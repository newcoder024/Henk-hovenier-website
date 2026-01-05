<template>
    <div class="full">
        <form action="" id="full">
            
            <div class="subtext">
                <h3>Admin login</h3>
            <p color="#2d3319">Log in om orders te beheren</p>
            </div>
            

            <label for="email">Email</label><br>
            <input type="email" id="email" v-model="email" placeholder="henk@groendoen.com"/><br>

            <label for="password">Wachtwoord</label><br>
            <input type="password" id="password" v-model="password" placeholder="• • • • • • • •" /><br>

            <button type="button" @click="login" class="login">Inloggen</button><br><br>
        
            <div class="disclaimer">
                <strong>Nog geen account?</strong>
                <p>Neem contact op met de systeembeheerder om een admin account aan te maken.</p>
            </div>
        </form>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');

function login() {
    if (email.value === 'admin' && password.value === 'admin123') {
        router.push('/overzicht');
    } else {
        alert('Ongeldige inloggegevens');
    }
}
</script>
<style scoped>  
.subtext{
    text-align: center;
    margin-bottom: 20px;
}
.full{
    min-height: 80vh;
}
form {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #ffffff;

}
h3 {
    text-align: center;
    margin-bottom: 1rem;
}
.login{
    width: 100%;
  margin-top: 20px;
  background-color: #4b7c2d;
  font-size: 1.1rem;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}
input{
    width: 100%;
    padding: 8px;
    margin: 8px 0 16px 0;
    box-sizing: border-box;
    border: none;
}
.disclaimer{
    font-size: 0.9rem;
    color: #2d3319;
    background-color: #f9f5ee;
    margin-top: 15px;
    padding: 10px;
    border-radius: 5px;
}

</style>