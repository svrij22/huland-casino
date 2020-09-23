import VueRouter from "vue-router";
import AuthenticationPage from "@/components/AuthenticationPage";
import MainComponent from "@/components/MainComponent";

export default new VueRouter({
    routes: [
        {path: '/', component: AuthenticationPage},
        {path: '/game', component: MainComponent}
    ]
})