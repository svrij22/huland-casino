<template>
    <div class="header">
        <div class="content">
            <div class="chip-container">
                <img src="../assets/chip.png">
                <span>{{userdata.chips}}</span>
            </div>
            <div class="name-container">
                <span>{{userdata.username | capitalize}}</span>
                <button @click="logout">Log out</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HeaderComponent",
        props: ['userdata'],
        filters: {
            capitalize: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        },
        methods:{
            logout(){
                localStorage.setItem("logintoken", "")
                this.$router.push("/")
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header{
        width: 100%;
        height: 50px;
        box-shadow: 0 10px 10px #8ec4e7;
        background-color: #63b9cb;
        display: flex;
        justify-content: center;

        & .content{
            display: flex;
            justify-content: space-between;
            max-width: 900px;
            width: 100%;
        }

        & .chip-container{
            display: flex;
            align-items: center;
        }

        & .name-container{
            display: flex;
            align-items: center;

            & button{
                background-color: #34626c;
                color: #fff;
                padding: 4px;
                margin: 8px;
                border: none;
                cursor: pointer;
                flex-grow: 4;
                border-radius: 5px;
                font-size: 18px;
            }
        }

        & img{
            height: 48px;
        }

        & span{
            font-size: 25px;
        }
    }
</style>