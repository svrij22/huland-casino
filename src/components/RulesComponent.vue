<template>
    <div>
        <!--Rule position and state-->
        <div v-for="(rule, position) in rules" :key="position">
            <div class="rule-header form-group" ><b>Rule {{position}}</b>
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
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import _ from 'lodash';

    export default {
        name: "RulesComponent",
        data: function(){
            return {
                rules: [],
                copy: [],
                states: ['Playing', 'Standing', 'Bust', 'Blackjack', 'DealerWins', 'Push'],
                separators: ['NONE', 'AND', 'OR'],
                values: ['DEALERCARDVALUE', 'PLAYERCARDVALUE', 'DEALERCARDAMOUNT', 'PLAYERCARDAMOUNT'],
                conditions: ['EQUALS', 'EQUALSLOWERTHAN', 'LOWERTHAN', 'EQUALSLOWERTHAN', 'GREATERTHAN'],
                unacceptedRules: {}
            }
        },
        mounted(){
            this.updateAll();
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
                    console.log(res)
                    this.updateAll();
                }).catch(() =>{

                })
            },
            isOriginal(position){
                return _.isEqual(this.copy[position], this.rules[position])
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


    .btn{
        width: 130px;
    }
    .red-input{
        background-color: #e7cbcb;
    }
</style>