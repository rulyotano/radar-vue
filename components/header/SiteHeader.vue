<template>
    <div>
        <div class="main-navbar">
            <div class="ctn">
                <Logo/>

                <div class="navbar-collapse collapse" :class="{'in' : open}">
                    <FiltersAndMenu/>

                    <ul class="nav navbar-nav navbar-right hidden-collapse">
                        <li>
                            <!-- <PubliButton/> -->
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Logo from './Logo.vue'
    import { mapState } from 'vuex'
    import {SET_MENU_OPEN} from '~/store/mutation-types'
    import FiltersAndMenu from '~/components/header/_FiltersAndMenu.vue'

    export default {
        components: {
            Logo, FiltersAndMenu
        },
        computed:{
            ...mapState({
                open: 'menuOpen'
            })
        }  
    }
</script>

<style>

</style>
