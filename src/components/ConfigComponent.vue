<template>
    <div>
        <!--User data header-->
        <header-component :userdata="userdata"/>
        <div class="buttons"> </div>
        <!--Rules editor-->
        <rules-component/>
    </div>
</template>

<script>
    import HeaderComponent from "@/components/HeaderComponent";
    import axios from "axios";
    import RulesComponent from "@/components/RulesComponent";
    export default {
        name: "ConfigComponent",
        components: {RulesComponent, HeaderComponent},
        data: function(){
            return {
                userdata: {}
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

<style scoped>

</style>