<script>
import axios from "axios";
import { toast } from 'vue3-toastify';

export default {
    name: "FormRegister",
    data() {
        return {
            user: {
                id: 0,
                usuario: "",
                correo: "",
                contraseña: "",
                nombre: "",
                direccion: ""
            }
        }
    },
    methods: {
        sendRegister(e) {
            e.preventDefault();
            const user = this.user
            axios.post(`https://localhost:7198/Loggin`, user)
                .then(response => {
                    this.token = response.data
                    toast("Usuario registrado con éxito", {
                        "theme": "dark",
                        "type": "success",
                        "autoClose": 5000,
                        "hideProgressBar": true
                    })
                }).catch(error => {
                    toast("Ocurrio un error al registrarte, intentalo más tarde", {
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
    <form @submit="sendRegister">
        <div class="input-group mb-3">
            <input v-model="user.usuario" type="text" class="form-control" placeholder="Usuario" aria-label="Usuario" />
        </div>
        <div class="input-group mb-3">
            <input v-model="user.nombre" type="text" class="form-control" placeholder="Nombre" aria-label="Nombre" />
        </div>
        <div class="input-group mb-3">
            <input v-model="user.direccion" type="text" class="form-control" placeholder="Dirección"
                aria-label="Dirección" />
        </div>
        <div class="input-group mb-3">
            <input v-model="user.correo" type="text" class="form-control" placeholder="E-mail" aria-label="User"
                aria-describedby="basic-addon2" />
            <span class="input-group-text" id="basic-addon2">@servidor.com</span>
        </div>
        <div class="input-group mb-3">
            <input v-model="user.contraseña" type="password" class="form-control" placeholder="Password"
                aria-label="pasword" />
        </div>
        <div class="container">
            <div class="row">
                <input class="btn btn-primary" type="submit" value="Registrarse" />
            </div>
        </div>
    </form>
</template>