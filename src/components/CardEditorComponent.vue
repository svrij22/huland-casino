<template>
    <div class="settings-box">

        <!--Header-->
        <div class="header-comp">
            <h1>Settings</h1>
            <div>
                <button @click="setAll" class="btn btn-success" v-if="!hasApplied">Apply</button>
            </div>
        </div>

        <!---->
        <div class="form-group">
            <label>Dealer Plays Till</label>
            <input class="form-control" v-model="data.gameLogic.dealerPlaysTill" @change="hasApplied = false">
        </div>
        <div class="form-group">
            <label>Max Play Value</label>
            <input class="form-control" v-model="data.valueStrategy.maxValue">
        </div>


        <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" id="customSwitch1" @click="switchConfig" v-model="configIsCustom">
            <label class="custom-control-label" for="customSwitch1">Custom configuration</label>
        </div>

        <div v-if="configIsCustom">
            <div class="single-card">
                <div class="form-group" >
                    <label>For Card</label>
                    <b class="form-control card-type" v-for="card in cards"
                           :value="card" v-bind:key="card">
                        {{card}}
                    </b>
                </div>
                <div class="form-group" >
                    <label>Card amount</label>
                    <input class="form-control" v-for="(card, position) in data.deck.cardAmounts"
                           v-bind:key="position"
                           v-model="data.deck.cardAmounts[position]"
                           @change="hasApplied = false">
                </div>
                <div class="form-group">
                    <label>Card Values</label>
                    <input class="form-control" v-for="(card, position) in data.valueStrategy.cardValues"
                           v-bind:key="position"
                           v-model="data.valueStrategy.cardValues[position]"
                            @change="hasApplied = false">
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from "axios";
    import _ from 'lodash';

    export default {
        name: "SettingsComponent",
        data: function(){
            return {
                data: {},
                hasApplied: true,
                cards: [2,3,4,5,6,7,8,9,10,"J","Q","K","A"]
            }
        },
        mounted(){
            this.getAll();
        },
        computed:{
            configIsCustom(){
                return (this.data.deck?.name != "DefaultDeck");
            }
        },
        methods: {
            switchConfig(){
                axios({
                    url: this.$restip + "/config/custom",
                    method: 'post',
                    headers: {
                        Authorization: localStorage.getItem("logintoken")
                    },
                    data:{
                        customConfigEnabled: (!this.configIsCustom)
                    }
                }).then((res) => {
                    this.data = res.data;
                    this.data = _.cloneDeep(this.data);
                })
            },
            getAll(){
                axios({
                    url: this.$restip + "/config/all",
                    method: 'get',
                    headers: {
                        Authorization: localStorage.getItem("logintoken")
                    }
                }).then((res) => {
                    this.data = res.data;
                    this.data = _.cloneDeep(this.data);
                })
            },
            setAll(){
                axios({
                    url: this.$restip + "/config/change",
                    method: 'post',
                    headers: {
                        Authorization: localStorage.getItem("logintoken")
                    },
                    data: {
                        cardAmounts: this.data.deck.cardAmounts,
                        cardValues: this.data.valueStrategy.cardValues,
                        maxPlayValue: this.data.valueStrategy.maxValue,
                        dealerPlaysTill: this.data.gameLogic.dealerPlaysTill
                    }
                }).then((res) => {
                    this.data = res.data;
                    this.data = _.cloneDeep(this.data);
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

    .settings-box{
        text-align: left;
    }
    .header-comp{
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        padding: 20px;

        & button{
            padding: 10px;
            margin: 8px;
        }
    }

    .add-rule{
        display: flex;
        justify-content: left;
        margin-left: 10px;
    }

    .btn{
        width: 130px;
    }
    .red-input{
        background-color: #e7cbcb;
    }

    .form-group{
        text-align: left;
        font-weight: 800;
    }

    .single-card{
        display: flex;
        flex-direction: row;
        width: 100%;

        & .form-group{
            width: 100%;
            margin: 4px;
        }

        & input, b{
            margin-top: 10px;
        }

        & .card-type{
            border: 1px solid white;
            font-weight: 800;
            width: 40px;
        }
    }
</style>