<template>
    <div class="form">
        <span>Register</span>
        <div class="form-content">
            <span class="sm">Username</span>
            <input v-model="userdata.username">
            <span class="sm">Password</span>
            <input type="password" v-model="userdata.password">
            <input type="password" v-model="userdata.password2">
            <span class="sm">Name</span>
            <div class="names">
                <input v-model="userdata.firstName">
                <input v-model="userdata.lastName">
            </div>
        </div>
        <span class="sm">{{loginmsg}}</span>
        <button @click="register">Register</button>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "RegisterForm",
        data: function () {
            return {
                loginmsg: '',
                userdata: {
                    username: 'test22',
                    password: 'test22',
                    password2: 'test22',
                    firstName: 'bob',
                    lastName: 'marley'
                }
            }
        },
        methods: {
            register(){

                if (this.userdata.password !== this.userdata.password2){
                    this.loginmsg = "Passwords are not equal. Please check your input."
                    return;
                }

                axios({
                    url: this.$restip + "/register",
                    method: 'post',
                    data: {
                        username: this.userdata.username,
                        password: this.userdata.password,
                        firstName: this.userdata.firstName,
                        lastName: this.userdata.lastName
                    }
                }).then(() => {
                    this.loginmsg = "Account registered!"
                }).catch((error) => {
                    this.loginmsg = error.message;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .names{
        display: flex;

        & input:first-of-type{
            margin-right: 10px;
        }
    }
</style>