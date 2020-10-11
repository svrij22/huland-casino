<template>
    <div class="game">
        <div class="board">
            <img src="../assets/board.png"/>
        </div>
        <div class="game-container">
            <div class="cards-object dealer-cards" :style="marginCardRight(gamedata.dealerCards)">
                <div class="card-container" v-for="card in gamedata.dealerCards" :key="card">
                    <img :src="getCard(card.cardType, card.cardSuit, card.visible)"/>
                </div>
            </div>
            <span>{{dealerHandValue}}</span>
            <div style="margin-bottom: 80px">
                <div v-for="(player, index) in gamedata.playerCards" v-bind:key="'player' + player" class="cards-object player-cards" :style="marginCardRight(player)">
                    <span class="hand-info">{{cardValue(index)}} {{handState(index)}}</span>
                    <div  class="card-container"  v-for="card in player" :key="card">
                        <img :src="getCard(card.cardType, card.cardSuit, card.visible)" />
                    </div>
                </div>
            </div>
            <div class="button-container">
                <button @click="playMove('hit')" v-if="canPlay('Hit')">Hit</button>
                <button @click="playMove('stand')" v-if="canPlay('Stand')">Stand</button>
                <button @click="playMove('surrender')" v-if="canPlay('Surrender')">Surrender</button>
                <button @click="playMove('double')" v-if="canPlay('Double')">Double</button>
                <button @click="playMove('split')" v-if="canPlay('Split')">Split</button>
                <button @click="playMove('retry')" v-if="canReset">Retry</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {getCard} from "../assets/cardController";
    import axios from "axios";
    import _ from 'lodash';

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
            },
            cardValue(index){
                return this.gamedata?.handValue[index];
            },
            handState(index){
                let state =  this.gamedata?.playerStates[index];
                return (state !== "Playing") ? state : "";
            }
        },
        computed: {
            playerHandValue(){
                return _.join(_.map(this.gamedata?.handValue, (o) => {return o}), " - ");
            },
            dealerHandValue(){
                return this.gamedata?.handValueDealer
            },
            gameState(){
                return this.gamedata?.gameState;
            },
            canReset(){
                return _.size(this.gamedata?.playerOptions) == 0;
            }
        }
    }
</script>

<style lang="scss" scoped>

    .board{
        height: 0px;

        & img {
            margin-top: 20vh;
            overflow: visible;
            transform: scale(1.5);
        }
    }

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
        z-index: 5;

        & span{
            font-size: 40px;
            color: #ffffff;
            -webkit-text-stroke: 1px black;
        }
    }
    .cards-object{

        display: flex;
        flex-direction: row;
        justify-content: center;

        overflow: visible;

        & .card-container{
            min-width: 90px;
        }

        & img {
            max-height: 255px;
            margin: 5px;

            position: absolute;
        }
    }

    .player-cards{
        height: 70px;
    }

    .dealer-cards{
        height: 250px;
    }

    .hand-info{
        z-index: 4;
        transform: translateY(-17px) translateX(-50px);
        max-width: 20px;
        overflow: visible;
        text-overflow: ellipsis;
        white-space: nowrap;
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
            opacity: 0.8;
            transition: 0.3s;
            display: inline-block;
            text-decoration: none;
            cursor: pointer;
            flex-grow: 1;
            max-width: 200px;
            border-radius: 4px;
            z-index: 1;
        }

        & button:hover {opacity: 1}
    }
</style>