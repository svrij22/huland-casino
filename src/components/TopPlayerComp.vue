<template>
    <div class="player-container">
        <h2>Leaderboard</h2>
        <div class="players">
            <div class="player" v-for="player in pdata" :key="player">
                <img src="../assets/user.webp">
                {{player.username}}<br>
                <img src="../assets/chip.png">
                {{player.amount}}
            </div>
        </div>
        {{datatest}}
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
        width: 250px;
        opacity: 0.8;
        max-width: 250px;
        background-color: #c4e8ef;
    }

    .players{
        display: flex;
        flex-direction: column;
        margin: 20px 10px;

        & img{
            width: 30px;
        }

        & .player{
            padding: 6px;
            font-size: 18px;
            text-align: left;
            border-bottom: 1px solid #7d7d7d;
        }
    }
</style>