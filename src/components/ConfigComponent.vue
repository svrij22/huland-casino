<template>
    <div>
        <!--User data header-->
        <header-component :userdata="userdata"/>
        <!--Rules editor-->
        <div class="container">
            <div class="button-menu">
                <button class="btn btn-warning" @click="page='rules'">Rules</button>
                <button class="btn btn-secondary" @click="page='sett'">Settings</button>
            </div>
            <rules-component v-if="page=='rules'" style="flex-grow: 1"/>
            <settings-component v-else/>
        </div>
    </div>
</template>

<script>
    import HeaderComponent from "@/components/HeaderComponent";
    import axios from "axios";
    import RulesComponent from "@/components/RulesComponent";
    import SettingsComponent from "@/components/SettingsComponent";
    export default {
        name: "ConfigComponent",
        components: {SettingsComponent, RulesComponent, HeaderComponent},
        data: function(){
            return {
                userdata: {},
                page: 'rules'
            }
        },
        methods: {
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
        },
        mounted(){
            this.loadUserData();
        }
    }
</script>

<style lang="scss" scoped>
    .button-menu{
        display: flex;
        justify-content: center;
        margin-top: 25px;

        & button{
            width: 100%;
            max-width: 200px;
            font-weight: 800;
            padding: 10px;
            margin: 3px;
        }
    }
    .container{
        display: flex;
        flex-direction: column;
    }
</style>