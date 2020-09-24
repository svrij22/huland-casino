<template>
    <div style="height: 95%;">
        <header-component :userdata="data"/>
        <game-component v-if="!isBetting" v-on:betting="setBetting" :gamedata="game"/>
        <bet-component v-else v-on:betting="setBetting" :userdata="data"/>
    </div>
</template>

<script>
    import axios from "axios";
    import HeaderComponent from "@/components/HeaderComponent";
    import GameComponent from "@/components/GameComponent";
    import BetComponent from "@/components/BetComponent";

    export default {
        name: "Main",
        components: {BetComponent, GameComponent, HeaderComponent},
        data: function () {
            return {
                hasToken: false,
                data: {},
                game: {},
                isBetting: true
            }
        },
        methods: {
            checkBearerAndUpdateToken(){
                this.hasToken = localStorage.getItem("logintoken").includes("Bearer")
                if (!this.hasToken) this.$router.push("/")

                axios({
                    url: this.$restip + "/chips/balance",
                    method: 'get',
                    headers: {
                        Authorization: localStorage.getItem("logintoken")
                    }
                }).then((res) => {
                    this.data = res.data;
                })
            },
            getGameState(){
                axios({
                    url: this.$restip + "/game/state/",
                    method: 'get',
                    headers: {
                        Authorization: localStorage.getItem("logintoken")
                    }
                }).then((res) => {
                    this.game = res.data;
                    this.isBetting = false;
                }).catch(() =>{
                    this.isBetting = true;
                })
            },
            setBetting(value){
                this.checkBearerAndUpdateToken()
                this.getGameState();
                this.isBetting = value
            }
        },
        mounted(){
            this.checkBearerAndUpdateToken();
            this.getGameState();
        }
    }
</script>

<style scoped>

</style>