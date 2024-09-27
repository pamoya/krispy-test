<script>
import { toast } from 'vue3-toastify';
import router from './router';
export default {
  name: "app",
  data() {
    return {
      usuario: null,
    };
  },
  mounted() {
    this.usuario = JSON.parse(localStorage.getItem("userAuth"));
  },
  methods: {
    logout() {
      localStorage.removeItem("userAuth");
      toast("Se ha cerrado sesion correctamente", {
        "theme": "dark",
        "type": "success",
        "autoClose": 5000,
        "hideProgressBar": true
      })
      this.usuario = null;
      router.push({ path: '/sales' })
    },
    changeUser(user) {
      this.usuario = user
    }
  },
};
</script>

<template>
  <div class="container" id="app">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Panadería</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/sales">Ventas</router-link>
            </li>
            <li v-if="this.usuario !== null" class="nav-item">
              <router-link class="nav-link" to="/donuts">Donas</router-link>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <div v-if="this.usuario !== null" class="container text-center nav-item">
              <div class="row">
                <div class="col nav-link">
                  <i class="bi bi-person-circle"></i>
                </div>
                <div class="col nav-link">
                  <div class="row">
                    <div class="col">
                      <label>Bienvenido</label>
                    </div>
                    <div class="col">
                      <strong>{{ this.usuario.usuario }}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <router-link v-if="this.usuario === null" class="nav-link" to="/login"><button
                class="btn btn-outline-success" type="button">
                Login
              </button></router-link>
            <div class="nav-link">
              <button v-if="this.usuario !== null" class="btn btn-outline-success" type="button"
                v-on:click="this.logout">
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  </div>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :change-user="this.changeUser" />
    </keep-alive>
  </router-view>
</template>

<style>
nav a {
  margin: 0 10px;
}
</style>
