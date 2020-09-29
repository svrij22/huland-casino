import VueRouter from "vue-router";
import AuthenticationPage from "@/components/AuthenticationPage";
import MainComponent from "@/components/MainComponent";
import ConfigComponent from "@/components/ConfigComponent";

export default new VueRouter({
    routes: [
        {path: '/', component: AuthenticationPage},
        {path: '/game', component: MainComponent},
        {path: '/config', component: ConfigComponent}
    ]
})