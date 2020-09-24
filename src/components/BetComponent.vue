<template>
    <div class="container">
        <div class="bet-container">
            <img src="../assets/chip.png"/>
            <span>Place your bet:</span>
            <input v-model="bet">
            <button @click="doBet">Place bet</button>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "BetComponent",
        data: function () {
            return {
                bet: 0
            }
        },
        methods: {
            doBet(){
                axios({
                    url: this.$restip + "/game/bet",
                    method: 'post',
                    headers: {
                        Authorization: localStorage.getItem("logintoken")
                    },
                    data: {
                        amount: this.bet
                    }
                }).then(() => {
                    this.$emit('betting', false)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        display: flex;
        justify-content: center;
    }

    .bet-container{
        margin-top: 100px;
        display: flex;
        flex-direction: column;

        & span{
            color: #535353;
        }

        & img{
            max-width: 200px;
        }

        & input{
            width: 100%;
            padding: 12px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            box-sizing: border-box;
        }

        & button{
            background-color: #63b9cb;
            color: #fff;
            padding: 9px;
            border: none;
            cursor: pointer;
            flex-grow: 4;
            font-size: 18px;
        }
    }
</style>