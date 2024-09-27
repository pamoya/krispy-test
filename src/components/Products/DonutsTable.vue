<script>
export default {
    name: "DonutsTable",
    props:{
        addACart:{
            type:Function,
        },
        listarDonas:{
            type:Array
        }
    }

}
</script>

<template>
    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Agregar</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="ld in listarDonas" v-bind:key="ld.id">
                    <td>{{ ld.nombre }}</td>
                    <td>{{ ld.descripcion }}</td>
                    <td>{{ ld.precio }}</td>
                    <td>
                        <img v-bind:src="ld.imagen" class="img-fluid" width="250px" v-bind:alt="ld.nombre"/>
                    </td>
                        <td>
                            <button type="button" class="btn btn-primary" v-on:click="this.addACart(ld)"><i class="bi bi-cart-plus"></i></button>
                        </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>