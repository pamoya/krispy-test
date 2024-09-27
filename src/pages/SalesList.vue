<script>
import axios from 'axios';
import SalesTable from '@/components/Sales/SalesTable.vue';
import SalesFilter from '@/components/Sales/SalesFilter.vue';
import { toast } from 'vue3-toastify';

export default {
    data() {
        return {
            id: "",
            listarVentas: [],
            listarVentasFilter: [],
        }
    },
    mounted() {
        axios
            .get("https://localhost:7198/Ventas/totales")
            .then((response) => {
                this.listarVentas = response.data;
                this.listarVentasFilter = response.data;
                this.showToast();
            })
            .catch(function (error) {
                toast("Ocurrio un error al solicitar la información", {
                "theme": "dark",
                "type": "error",
                "autoClose": 5000,
                "hideProgressBar": true
            })
                console.log(error);
            })
            .finally(function () {
                //Se ejcuto sin problemas
            });

    },
    components: {
        SalesTable,
        SalesFilter,
    },
    methods: {
        filterData(id) {
            const filterData = [...this.listarVentas].filter(venta => {
                if (venta.id === Number(id)) {
                    return venta
                }
            })
            this.listarVentasFilter = filterData
        },
        deleteFilter() {
            this.listarVentasFilter = [...this.listarVentas];
        },
        showToast() {
            
        }
    }
}
</script>
<template>
    <div class="product-list-container">
        <SalesFilter :filter-sales="this.filterData" :filter-delete="deleteFilter" />
        <SalesTable :listar-ventas="this.listarVentasFilter" />
    </div>
</template>