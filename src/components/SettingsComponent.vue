<template>
    <div>

        <!--Header-->
        <div class="header-comp">
            <h1>Settings</h1>
            <div>
                <button @click="setAll" class="btn btn-success">Apply</button>
                <button @click="getAll" class="btn btn-warning">Reset</button>
            </div>
        </div>

        <!---->
        <div class="form-group">
            <label>Dealer Plays Till</label>
            <input class="form-control" v-model="data.dealerPlaysTill">
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
                data: {}
            }
        },
        mounted(){
            this.getAll();
        },
        methods: {
            getAll(){
                axios({
                    url: this.$restip + "/rules/all",
                    method: 'get',
                    headers: {
                        Authorization: localStorage.getItem("logintoken")
                    }
                }).then((res) => {
                    this.data = res.data.gameLogic;
                    this.data = _.cloneDeep(this.data);
                })
            },
            setAll(){
                axios({
                    url: this.$restip + "/rules/update",
                    method: 'post',
                    headers: {
                        Authorization: localStorage.getItem("logintoken")
                    },
                }).then(() => {
                    this.getAll();
                });
            }
        } 
    }
</script>

<style lang="scss" scoped>

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
</style>