import VueRouter from "vue-router";
import LoginForm from "@/components/LoginForm";

export default new VueRouter({
    routes: [
        {path: '/', component: LoginForm}
    ]
})