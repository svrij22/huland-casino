import VueRouter from "vue-router";
import AuthenticationPage from "@/components/AuthenticationPage";

export default new VueRouter({
    routes: [
        {path: '/', component: AuthenticationPage}
    ]
})