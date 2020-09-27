<template>
    <div class="player-container">
        <h2>Leaderboard</h2>
        <div class="players">
            <div class="player" v-for="player in pdata" :key="player">
                <div>
                    <img src="../assets/old/user.webp">
                    {{player.username}}
                </div>
                <div>
                    <img src="../assets/old/casino-chip.png">
                    {{player.amount}}
                </div>
                <div>
                    <img src="../assets/old/play.png">
                    {{player.gamesPlayed}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "TopPlayerCompo",
        data: function(){
            return {
                pdata: ''
            }
        },
        mounted(){
            axios({
                url: this.$restip + "/chips/top",
                method: 'get',
                headers: {
                    Authorization: localStorage.getItem("logintoken")
                }
            }).then((res) => {
                this.pdata = res.data;
            })
        }
    }
</script>

<style lang="scss" scoped>
    .player-container{
        margin: 30px 0px;
        border-radius: 6px;
        width: 200px;
        opacity: 0.8;
        max-width: 250px;
        background-color: #c4e8ef;

        position: fixed;
    }

    .players{
        display: flex;
        flex-direction: column;
        margin: 20px 10px;
        min-width: 170px;

        & img{
            height: 25px;
        }

        & .player{
            padding: 6px;
            font-size: 18px;
            text-align: left;
            border-bottom: 1px solid #7d7d7d;
        }
    }
</style>