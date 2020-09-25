<template>
    <div class="game">
        <div class="game-container">
            <div class="cards-object" :style="marginCardRight(gamedata.dealerCards)">
                <div class="card-container" v-for="card in gamedata.dealerCards" :key="card">
                    <img :src="getCard(card.cardType, card.cardSuit, card.visible)"/>
                </div>
            </div>
            <span>{{dealerHandValue}}</span>
            <span>{{gameState}}</span>
            <span>{{playerHandValue}}</span>
            <div class="cards-object" :style="marginCardRight(gamedata.playerCards)">
                <div  class="card-container"  v-for="card in gamedata.playerCards" :key="card">
                    <img :src="getCard(card.cardType, card.cardSuit, card.visible)" />
                </div>
            </div>
            <div class="button-container">
                <button @click="playMove('hit')" v-if="canPlay('Hit')">Hit</button>
                <button @click="playMove('stand')" v-if="canPlay('Stand')">Stand</button>
                <button @click="playMove('surrender')" v-if="canPlay('Surrender')">Surrender</button>
                <button @click="playMove('double')" v-if="canPlay('Double')">Double</button>
                <button @click="playMove('retry')" v-if="canPlay('Reset')">Retry</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {getCard} from "../assets/cardController";
    import axios from "axios";

    export default {
        name: "GameComponent",
        props: ['gamedata'],
        methods:{
            getCard(rank, suit, visibility) {
                return getCard(rank, suit, visibility)
            },
            playMove(move){
                axios({
                    url: this.$restip + "/game/state/" + move,
                    method: 'post',
                    headers: {
                        Authorization: localStorage.getItem("logintoken")
                    }
                }).then((res) => {
                    this.gamedata = res.data;
                    if (move === 'retry'){
                        this.$emit('betting', true)
                    }
                }).catch(() => {
                    this.$router.push("/")
                })
            },
            canPlay(move){
                return this.gamedata?.playerOptions?.includes(move);
            },
            marginCardRight(cards){
                let cardAmt = cards.length
                let pxAmt = Math.pow(800, 1/(cardAmt*1))
                return "margin-right: " + (140 + pxAmt) + "px;"
            }
        },
        computed: {
            playerHandValue(){
                return this.gamedata?.handValue
            },
            dealerHandValue(){
                return this.gamedata?.handValueDealer
            },
            gameState(){
                let state = this.gamedata?.gameState;
                if (state === "Playing") return '';
                return state;
            }
        }
    }
</script>

<style lang="scss" scoped>

    .game{
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .game-container{
        padding-top: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 90%;
        width: 100%;

        & span{
            font-size: 40px;
            color: #535353;
        }
    }
    .cards-object{

        display: flex;
        flex-direction: row;
        justify-content: center;

        overflow: visible;
        height: 250px;

        & .card-container{
            min-width: 90px;
        }

        & img {
            max-height: 250px;
            margin: 5px;

            position: absolute;
        }
    }

    .button-container{

        display: flex;
        justify-content: center;
        align-content: center;
        width: 100%;

        & button {
            background-color: #f4511e;
            border: 1px solid #c23333;
            color: white;
            padding: 20px 40px;
            text-align: center;
            font-size: 20px;
            margin: 4px 2px;
            opacity: 0.6;
            transition: 0.3s;
            display: inline-block;
            text-decoration: none;
            cursor: pointer;
            flex-grow: 1;
            max-width: 200px;
            border-radius: 4px;
        }

        & button:hover {opacity: 1}
    }
</style>