<script>
import axios from "axios";
import DonutsTable from "@/components/Products/DonutsTable.vue";
import ButtonCart from "@/components/Products/ButtonCart.vue";
import ModalCart from "@/components/Products/ModalCart.vue";
import { toast } from 'vue3-toastify';

export default {
    data() {
        return {
            fields: ["nombre", "descripcion", "precio", "imagen"],
            id: "",
            nombre: "",
            descripcion: "",
            precio: "",
            imagen: "",
            donutsList: [],
            ventaDetalles: {
                idDona: "",
                cantidad: "",
            },
            venta: {
                idUsuario: "",
                direccion: "",
                total: "",
                ventaDetalle: [],
            },
            salesCart: [],
            articlesInCart: 0,
            listDetalles: [],
        };
    },
    mounted() {
        axios
            .get("https://localhost:7198/Donas")
            .then((response) => {
                this.donutsList = response.data;
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
        DonutsTable,
        ButtonCart,
        ModalCart,
    },
    methods: {
        validateDetailExists(id) {
            const validate = this.salesCart.map(sale => {
                return sale.idDona
            })

            const exist = validate.includes(id, 0);            

            if(!exist){
                const value=1
                return {exist, value}
            }

            const quantity = this.salesCart.filter(sale => {
                if (sale.idDona === id) {
                    return sale.cantidad
                }
            }).shift()
            const value = quantity.cantidad

            return { exist, value }
        },
        addACart(donut) {
            const detail = {
                idDona: donut.id,
                cantidad: 1,
            };

            const { exist, value } = this.validateDetailExists(donut.id)
              if (exist) {
                this.updateSalesCart(value + 1, donut.id)
            } else {
                this.salesCart.push(detail);
                this.updateCart();
            }

        },
        updateCart() {
            let tot = 0;

            if(this.salesCart.length > 0){
                for (const det of this.salesCart) {
                const currentDonut = this.donutsList
                    .filter((don) => {
                        if (don.id === det.idDona) {
                            return don.precio;
                        }
                    })
                    .shift();
                tot += det.cantidad * currentDonut.precio;
            }

            this.articlesInCart = this.salesCart.length;
            }
            else{
                this.articlesInCart = 0
            }

            const sale = {
                idUsuario: 1,
                direccion: "prueba calle",
                total: tot,
                ventaDetalles: this.salesCart,
            };

            this.venta = sale;
            this.getListDetalles();
        },
        getListDetalles() {
            this.listDetalles = this.salesCart.map((sale) => {
                const currentDonut = this.donutsList
                    .filter((don) => {
                        if (don.id === sale.idDona) {
                            return don;
                        }
                    })
                    .shift();

                const newDetail = {
                    id: sale.idDona,
                    imagen: currentDonut.imagen,
                    precio: currentDonut.precio,
                    nombre: currentDonut.nombre,
                    cantidad: sale.cantidad,
                    total: sale.cantidad * currentDonut.precio,
                };

                return newDetail;
            });
        },
        handleUpdateSalesCart(e, id) {
            e.preventDefault();
            const quantity = e.target.value
            this.updateSalesCart(quantity, id)

        },
        updateSalesCart(quantity, id) {
            const newSalesCart = [...this.salesCart].map((detail) => {
                if (detail.idDona === id) {
                    detail.cantidad = quantity
                    return detail;
                }
                return detail;
            });
            this.salesCart = newSalesCart
            this.updateCart();
        },
        handleRemoveItemSalesCart(e,id){
            e.preventDefault();
            this.removeItemSalesCart(id)
        },
        removeItemSalesCart(id){
            const newSalesCart = [...this.salesCart].filter((detail) => {
                if (detail.tipo != id) {
                    return detail;
                }
            });
            if(newSalesCart.length > 0){
                this.salesCart = newSalesCart;
            }
            else{
                this.salesCart = [];
            }
            this.updateCart();
        },
        handleDeleteSalesCart(e){
            e.preventDefault();
            this.deleteSalesCart()
        },
        deleteSalesCart(){
                this.salesCart = [];
              this.updateCart();
        },
        handleSaveSalesCart(e){
            e.preventDefault();
            this.saveSalesCart()
        },
        saveSalesCart(){
            const user = JSON.parse(localStorage.getItem('userAuth'))
            axios
            .post("https://localhost:7198/Ventas",this.venta,{headers: {"Authorization" : `Bearer ${user.token}`} })
            .then((response)=>{
                this.salesCart = [];
                
                toast(response.data, {
                "theme": "dark",
                "type": "success",
                "autoClose": 5000,
                "hideProgressBar": true
            })
              this.updateCart();
            }).catch(function (error){
                toast("Ocurrio un error al realizar la compra, intenta mas tarde", {
                "theme": "dark",
                "type": "error",
                "autoClose": 5000,
                "hideProgressBar": true
            })
                console.log(error)
            })

            
        },
    },
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h2>Lista de Donas</h2>
            </div>
            <div class="col">
                <ButtonCart :articles-in-cart="this.articlesInCart" />
            </div>
        </div>
    </div>
    <DonutsTable :add-a-cart="this.addACart" :listar-donas="this.donutsList" />
    <ModalCart :venta="this.venta" :sales-cart="this.salesCart" :donuts-list="this.donutsList"
        :list-detalles="this.listDetalles" :update-sales-cart="this.handleUpdateSalesCart" :remove-item-sales-cart="this.handleRemoveItemSalesCart" :delete-a-sale="this.handleDeleteSalesCart" :save-a-sale="this.handleSaveSalesCart" />
</template>
