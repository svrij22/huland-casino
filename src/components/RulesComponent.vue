<template>
    <div>
        <!--User data header-->
        <header-component :userdata="userdata"/>

        <!--Header-->
        <div class="header-comp">
            <h1>Rule editor</h1>
            <div>
                <button class="btn btn-dark" @click="addRule">Add rule</button>
                <button @click="resetAll" class="btn btn-warning">Reset</button>
            </div>
        </div>
        <!--Rule position and state-->
        <div v-for="(rule, position) in rules" :key="position">
            <div class="rule-header form-group" :class="{'rule-error': unacceptedRules.includes(position)}"><b>Rule {{position}}</b>
                <select v-model.lazy="rule.stateBefore" class="form-control">
                    <option v-for="state in states" :key="state">
                        {{state}}
                    </option>
                </select>
                <i class="fa fa-arrow-right"></i>
                <select v-model.lazy="rule.stateAfter" class="form-control">
                    <option v-for="state in states" :key="state">
                        {{state}}
                    </option>
                </select>
                <button class="form-control btn btn-danger">Remove</button>
                <button class="form-control btn btn-success" @click="updateRule(rule, position)" v-if="!isOriginal(position)">Apply</button>
            </div>
            <!--Rule content-->
            <div class="rule-content">
                <div v-for="(ruleitem, itemposition) in rule.conditionList" :key="ruleitem">
                    <div class="rule-item form-group">

                        <!--Separator-->
                        <input class="form-control" v-model.lazy="ruleitem.separator" list="separators" :class="checkseparator(ruleitem.separator)" v-if="itemposition!=0">
                        <datalist id="separators" class="form-control" v-if="itemposition != 0" v-show="false">
                            <option v-for="separator in separators" :key="separator">
                                {{separator}}
                            </option>
                        </datalist>

                        <!--First value-->
                        <input class="form-control" v-model.lazy="ruleitem.value1" list="values">

                        <!--Condition-->
                        <input class="form-control" v-model.lazy="ruleitem.condition" list="conditions">
                        <datalist id="conditions" class="form-control" v-show="false">
                            <option v-for="condition in conditions" :key="condition">
                                {{condition}}
                            </option>
                        </datalist>

                        <!--Second value-->
                        <input class="form-control" v-model.lazy="ruleitem.value2" list="values">
                        <datalist id="values"  class="form-control" v-show="false">
                            <option v-for="ruleValue2 in values" :key="ruleValue2">
                                {{ruleValue2}}
                            </option>
                        </datalist>
                    </div>
                </div>
                <div class="add-rule">
                    <button class="btn btn-dark" @click="addCondition(rule)">Add condition</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import _ from 'lodash';
    import HeaderComponent from "@/components/HeaderComponent";

    export default {
        name: "RulesComponent",
        components: {HeaderComponent},
        data: function(){
            return {
                rules: [],
                copy: [],
                states: ['Playing', 'Standing', 'Bust', 'Blackjack', 'DealerWins', 'Push'],
                separators: ['NONE', 'AND', 'OR'],
                values: ['DEALERCARDVALUE', 'PLAYERCARDVALUE', 'DEALERCARDAMOUNT', 'PLAYERCARDAMOUNT'],
                conditions: ['EQUALS', 'EQUALSLOWERTHAN', 'LOWERTHAN', 'EQUALSLOWERTHAN', 'GREATERTHAN'],
                unacceptedRules: [],
                userdata: {}
            }
        },
        mounted(){
            this.updateAll();
            this.loadUserData();
        },
        methods: {
            checkseparator(separator){
                if (!this.separators.includes(separator)){
                    return "red-input"
                }
                return "";
            },
            updateAll(){
                axios({
                    url: this.$restip + "/rules/all",
                    method: 'get',
                    headers: {
                        Authorization: localStorage.getItem("logintoken")
                    }
                }).then((res) => {
                    this.rules = res.data.rules.rules;
                    this.copy = _.cloneDeep(this.rules);
                })
            },
            updateRule(rule, position){
                axios({
                    url: this.$restip + "/rules/update",
                    method: 'post',
                    headers: {
                        Authorization: localStorage.getItem("logintoken")
                    },
                    data: {
                        position: position,
                        conditionList: rule.conditionList,
                        stateBefore: rule.stateBefore,
                        stateAfter: rule.stateAfter
                    }
                }).then((res) => {
                    var result = _.omit(res.data, ['position']);
                    this.rules[position] = result
                    this.copy[position] = _.cloneDeep(result);
                    /*Apparently Vue doesnt update without this*/
                    this.copy = _.cloneDeep(this.copy);
                    _.remove(this.unacceptedRules, (n) => position==n)
                }).catch(() =>{
                    if (!this.unacceptedRules.includes(position)) this.unacceptedRules.push(position)
                })
            },
            resetAll(){
                axios({
                    url: this.$restip + "/rules/reset",
                    method: 'get',
                    headers: {
                        Authorization: localStorage.getItem("logintoken")
                    }
                }).then((res) => {
                    this.rules = res.data.rules.rules;
                    this.copy = _.cloneDeep(this.rules);
                })
            },
            isOriginal(position){
                return _.isEqual(this.copy[position], this.rules[position])
            },
            loadUserData(){
                this.hasToken = localStorage.getItem("logintoken").includes("Bearer")
                if (!this.hasToken) this.$router.push("/")

                axios({
                    url: this.$restip + "/chips/balance",
                    method: 'get',
                    headers: {
                        Authorization: localStorage.getItem("logintoken")
                    }
                }).then((res) => {
                    this.userdata = res.data;
                })
            },
            addCondition(rule){
                rule.conditionList.push({
                    separator: "AND"
                });
            },
            addRule(){
                this.rules.push({
                    conditionList: [{}]
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

    .fa-arrow-right{
        margin-left: 15px;
    }

    .rule-header{
        padding: 5px;
        background-color: #a0c8d2;
        margin: 8px;
        border-radius: 6px;
        font-size: 25px;
        text-align: left;
        display: flex;
        align-items: center;

        & select, button {
            margin-left: 20px;
            max-width: 200px;
        }

        & b{
            min-width: 80px;
        }
    }

    .rule-error{
        background-color: #d2a0a0;
    }

    .rule-item{
        padding: 2px;
        background-color: #b2c1c4;
        margin: 8px;
        border-radius: 6px;
        font-size: 30px;
        text-align: left;
        display: flex;
        align-items: center;

        & select, input{
            margin-left: 10px;
            width: 200px;
        }
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
</style>