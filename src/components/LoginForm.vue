<template>
    <div class="content">
        <div class="bg"/>
        <div class="container">
            <h3>
                HULAND CASINO
            </h3>
            <div class="aligner">
                <div class="form">
                    <span>Login</span>
                    <div class="form-content">
                        <span class="sm">Username</span>
                        <input>
                        <span class="sm">Password</span>
                        <input>
                    </div>
                    <button>Log in</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoginForm"
    }
</script>

<style lang="scss" scoped>

    .aligner{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 100px;
    }

    .form{
        background: rgba(220, 220, 220, 0.46);
        border-radius: 18px;
        min-height: 250px;
        width: 350px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        & .form-content{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 10px;
        }

        & span{
            color: white;
            font-weight: 600;
            font-size: 25px;
            text-shadow: rgba(0, 0, 0, 0.53) 0 0 10px;
        }

        & input{
            width: 100%;
            padding: 12px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            box-sizing: border-box;
        }

        & button{
            background-color: #63b9cb;
            color: #fff;
            padding: 15px;
            margin: 8px;
            border: none;
            cursor: pointer;
            flex-grow: 4;
            font-size: 18px;
        }

        & .sm{
            font-size: 15px;
        }
    }

    .content{
        height: 100%;
    }

    .container{
        position: fixed;
        left: 0;
        right: 0;
        z-index: 9999;
        margin-left: 20px;
        margin-right: 20px;
    }

    .bg {
        background-image: url("../assets/wallpaper.jpg");

        /* Add the blur effect */
        filter: blur(8px);
        -webkit-filter: blur(4px);

        position: fixed;
        left: 0;
        right: 0;
        z-index: 1;
        display: block;

        height: 100%;

        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    h3{
        font-size: 80px;
        color: #fff;
        text-align: center;
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6;
        margin: 10px 10px;
        margin-top: 60px;
    }

    .aligner{

    }
</style>