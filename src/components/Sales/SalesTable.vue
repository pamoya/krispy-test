<script>
export default {
    name: "SalesTable",
    props: {
        listarVentas: {
            type: Array
        }
    }
};
</script>

<template>
    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Dirección</th>
                    <th scope="col">Total</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody class="accordion" id="accordionSales">
                <template v-for="ld in listarVentas" v-bind:key="ld.id">
                    <tr class="accordion-item">
                        <td>{{ ld.id }}</td>
                        <td>{{ ld.usuario.nombre }}</td>
                        <td>{{ ld.usuario.direccion }}</td>
                        <td>$ {{ ld.total }}</td>
                        <td class="accordion-button collapsed" data-bs-toggle="collapse" :data-bs-target="'#detalle' + ld.id"
                        :aria-expanded="false" :aria-controls="'detalle' + ld.id">Ver detalle</td>
                    </tr>
                    <tr class="table accordion-collapse collapse" data-bs-parent="#accordionSales"
                        v-bind:id="'detalle' + ld.id">
                        <td colspan="5">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Dona</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="dt in ld.ventaDetalles" v-bind:key="dt.id">
                                        <td>
                                            <img v-bind:src="dt.dona.imagen" class="img-fluid" width="250px"
                                                v-bind:alt="dt.dona.nombre" />
                                        </td>
                                        <td>{{ dt.dona.nombre }}</td>
                                        <td>$ {{ dt.dona.precio }}</td>
                                        <td>$ {{ dt.cantidad }}</td>
                                        <td>$ {{ dt.cantidad * dt.dona.precio }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>
