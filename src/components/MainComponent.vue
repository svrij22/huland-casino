<template>
    <div>
        <header-component :userdata="data"/>
        <game-component :gamedata="game"/>
    </div>
</template>

<script>
    import axios from "axios";
    import HeaderComponent from "@/components/HeaderComponent";
    import GameComponent from "@/components/GameComponent";
    export default {
        name: "Main",
        components: {GameComponent, HeaderComponent},
        data: function () {
            return {
                hasToken: false,
                data: {},
                game: {}
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
                    url: this.$restip + "/game/state",
                    method: 'get',
                    headers: {
                        Authorization: localStorage.getItem("logintoken")
                    }
                }).then((res) => {
                    this.game = res.data;
                })
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