<script>
import CartTable from './CartTable.vue';
export default {
    name: "ModalCart",
    components:{
        CartTable
    },
    props:{
        venta:{
            type:Object
        },
        salesCart:{
            type:Array
        },
        donutsList:{
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
        },
        saveASale:{
            type:Function
        },
        deleteASale:{
            type:Function
        }
    }
}
</script>

<template>
    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cartModalLabel">Carrito de compras</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <CartTable :sales-cart="this.salesCart" :list-detalles="this.listDetalles" :update-sales-cart="this.updateSalesCart" :remove-item-sales-cart="this.removeItemSalesCart"/>
                    <div>Total={{ venta.total }}</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i>Cerrar</button>
                    <button type="button" class="btn btn-danger" v-on:click="this.deleteASale"><i class="bi bi-cart-x"></i>Eliminar</button>
                    <button type="button" class="btn btn-primary" v-on:click="this.saveASale"><i class="bi bi-currency-dollar"></i>Comprar</button>
                </div>
            </div>
        </div>
    </div>
</template>