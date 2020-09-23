<template>
    <div class="form">
        <span>Login</span>
        <div class="form-content">
            <span class="sm">Username</span>
            <input v-model="userdata.username">
            <span class="sm">Password</span>
            <input type="password" v-model="userdata.password">
        </div>
        <span class="sm">{{loginmsg}}</span>
        <button @click="login">Log in</button>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "LoginForm",
        data: function () {
            return {
                loginmsg: '',
                userdata: {
                    username: 'test22',
                    password: 'test22',
                }
            }
        },
        methods: {
            login(){
                axios({
                    url: this.$restip + "/login",
                    method: 'post',
                    data: {
                        username: this.userdata.username,
                        password: this.userdata.password,
                    }
                }).then((res) => {
                    this.loginmsg = "Logged in!"
                    localStorage.setItem("logintoken", res.headers.authorization)
                    this.$router.push("/chips")
                }).catch((error) => {
                    this.loginmsg = error.message;
                })
            }
        }
    }
</script>

<style scoped>

</style>