<script>
export default {
    name: "CartTable",
    props:{
        salesCart:{
            type:Array
        },
        listDetalles:{
            type:Array
        },
        updateSalesCart:{
            type:Function
        },
        removeItemSalesCart:{
            type:Function
        }
    },
}
</script>

<template>
    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Imagen</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Total</th>
                    <th scope="col">Eliminar</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="sc in listDetalles" v-bind:key="sc.id">
                    <td>
                        <img v-bind:src="sc.imagen" class="img-fluid" width="250px" v-bind:alt="sc.nombre"/>
                    </td>
                    <td>{{ sc.nombre }}</td>
                    <td>{{ sc.precio }}</td>
                    <td>
                        <form>
                        <input type="number" class="form-control" id="cantidad" min="1" :value="sc.cantidad" :onchange="(e)=>updateSalesCart(e,sc.id)">
                    </form>
                </td>
                    <td>{{ sc.cantidad * sc.precio }}</td>
                        <td>
                            <button type="button" class="btn btn-danger" v-on:click="(e)=>this.removeItemSalesCart(e,sc.id)"><i class="bi bi-cart-dash"></i></button>
                        </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>