<template>
    <div class="container">
        <div class="bet-container">
            <img src="../assets/chip.png"/>
            <span>Place your bet:</span>
            <input :class="{red: !canBet}" type="number" :max="userdata.chips" v-model="bet">
            <button @click="doBet">Place bet</button>
            <button @click="getChips" v-if="Number(userdata.chips) < 300" class="coloured">New chips</button>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "BetComponent",
        props: ['userdata'],
        data: function () {
            return {
                bet: 1
            }
        },
        methods: {
            doBet(){
                if (!this.canBet) return false;
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
            },
            isInt(n) {
                return n % 1 === 0;
            },
            getChips(){
                axios({
                    url: this.$restip + "/chips/renew",
                    method: 'get',
                    headers: {
                        Authorization: localStorage.getItem("logintoken")
                    }
                }).then(() => {
                    /*Forces a reload*/
                    this.$emit('betting', true)
                })
            }
        },
        computed: {
            canBet(){
                return this.isInt(this.bet) &&
                    !(this.bet < 0) &&
                    (Number(this.bet) == this.bet) &&
                    (this.bet <= Number(this.userdata.chips))
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        display: flex;
        justify-content: center;
        width: 100%;
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

        & .red{
            background-color: #e0cbcb;
        }

        & button{
            background-color: #63b9cb;
            color: #fff;
            padding: 9px;
            border: none;
            cursor: pointer;
            font-size: 18px;

        }
        & .coloured{
            margin-top: 10px;
            background-color: #ada161;
        }
    }
</style>