<script>
import axios from "axios";
import { toast } from 'vue3-toastify';
import router from "@/router";

export default {
    name: "FormLogin",
    data() {
        return {
            user: "",
            password: "",
            userAuth: ""
        }
    },
    props: {
        changeUser: {
            type: Function
        }
    },
    methods: {
        sendLogin(e) {
            e.preventDefault();
            axios.get(`https://localhost:7198/Loggin?user=${this.user}&password=${this.password}`)
                .then(response => {
                    this.userAuth = response
                    this.changeUser(this.userAuth.data)
                    localStorage.setItem('userAuth', JSON.stringify(this.userAuth.data))
                    router.push({ path: '/donuts' })
                }).catch(error => {
                    let message = "Ocurrio un al acceder, intentalo más tarde";

                    if (error.response) {
                        message = error.response?.data
                    }

                    toast(message, {
                        "theme": "dark",
                        "type": "error",
                        "autoClose": 5000,
                        "hideProgressBar": true
                    })

                    console.log(error)
                })
        }
    }
};
</script>

<template>
    <form @submit="sendLogin">
        <div class="input-group mb-3">
            <input v-model="user" type="text" class="form-control" placeholder="Usuario o E-mail"
                aria-label="DataAccess" aria-describedby="basic-addon2" />
            <span class="input-group-text" id="basic-addon2">@servidor.com</span>
        </div>
        <div class="input-group mb-3">
            <input v-model="password" type="password" class="form-control" placeholder="Password"
                aria-label="pasword" />
        </div>
        <div class="container">
            <div class="row">
                <div class="col">
                    <input class="btn btn-primary" type="submit" value="Iniciar Sesión" />
                </div>
                <div class="col">
                    <router-link class="nav-link" to="/register">¿No tienes cuenta?, resgitrate</router-link>
                </div>
            </div>
        </div>
    </form>
</template>
