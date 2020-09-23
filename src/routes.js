import VueRouter from "vue-router";
import AuthenticationPage from "@/components/AuthenticationPage";
import ChipsComponent from "@/components/ChipsComponent";

export default new VueRouter({
    routes: [
        {path: '/', component: AuthenticationPage},
        {path: '/chips', component: ChipsComponent}
    ]
})