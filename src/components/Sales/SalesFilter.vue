<script>
export default {
    name: "SalesFilter",
    data() {
        return{
            usuario:""
        }
    },
    props: {
        filterSales: {
            type: Function,
        },
        filterDelete:{
            type:Function
        }
    },
    methods:{
        sendEnter(e){
            if(e.which === 13){
                e.preventDefault()
                this.filterSales(this.usuario)
            }
        },
        deletefilter(){
            this.usuario=""
            this.filterDelete()
        },
    }
};
</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h2>Ventas</h2>
            </div>
            <div class="col">
                <form>
                    <div class="input-group mb-3">
                        <input v-model="usuario" type="text" class="form-control" placeholder="Id" aria-label="Id"
                            aria-describedby="basic-addon1" v-on:keydown="(e)=>sendEnter(e)" />
                        <span class="input-group-text" id="basic-addon1" v-on:click="()=>filterSales(usuario)">
                            <i class="bi bi-search"></i>
                        </span>
                        <span class="input-group-text" id="basic-addon1" v-on:click="()=>deletefilter()">
                            <i class="bi bi-x"></i>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
