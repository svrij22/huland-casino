<template>
    <div>
        <img :src="getCard('2', 'spades', true)"/>
    </div>
</template>

<script>
    import {getCard} from "../assets/cardController";

    export default {
        name: "GameComponent",
        props: ['game'],
        methods:{
            getCard(rank, suit, visibility) {
                return getCard(rank, suit, visibility)
            }
        }
    }
</script>

<style scoped>

</style>