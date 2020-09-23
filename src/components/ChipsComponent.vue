<template>
    <div>
        {{hasToken}} {{balance}}
        <button @click="logout">Log out</button>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "ChipsComponent",
        data: function () {
            return {
                hasToken: false,
                balance: undefined
            }
        },
        methods: {
            logout(){
                localStorage.setItem("logintoken", "")
                this.$router.push("/")
            }
        },
        mounted(){
            this.hasToken = localStorage.getItem("logintoken").includes("Bearer")
            axios({
                url: this.$restip + "/chips/balance",
                method: 'get',
                headers: {
                    Authorization: localStorage.getItem("logintoken")
                }
            }).then((res) => {
                this.balance = res.data;
            })
        }
    }
</script>

<style scoped>

</style>