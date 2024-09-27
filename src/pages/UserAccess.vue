<script>
import FormLogin from "@/components/Login/FormLogin.vue";
export default {
    name: "UserAccess",
    components: {
        FormLogin,
    },
    props: {
        changeUser: {
            type: Number,
        },
    },
};
</script>

<template>
    <div class="product-list-container">
        <h2>Acceso</h2>
        <FormLogin :change-user="this.changeUser" />
    </div>
</template>
