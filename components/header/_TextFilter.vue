<template>
    <form class="search-row">
        <div class="form-w-bth">
            <input class="form-control" type="text" placeholder="buscar..."
                    :value="text"
                    @change="textChange($event.target.value)"/>

                <div class="dropdown-menu search-empty" v-if="open">
                    NO HAY RESULTADOS
                </div>

                <button @click.prevent="applyTextFilter()"><i class="fa fa-search"/></button>
        </div>
    </form>
</template>

<script>
    import filtersService from '~/services/filters-service'    
    export default {
        data(){
            return {
                text: "",
                open: false
            }
        },
        methods:{
            textChange(text){
                this.text = text
            },
            applyTextFilter(){
                let text = this.text
                if (text && text.length > 0){
                    //check text
                    if (text.length > 15)
                        text = text.substr(0, 15)
                }
                else
                    text = undefined
                filtersService.setFilters(this.$router, this.$route, { q: text })
            }
        }        
    }
</script>

<style scoped>

</style>