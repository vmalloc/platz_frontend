import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createHead } from "@vueuse/head";
import PlatzApp from "./PlatzApp.vue";
import routes from "./routes";
import { createStore, storeSymbol } from "./store";
import "bootstrap";
import "./style/main.scss";
import { FontAwesomeIcon } from "./style/fontawesome";
import { installComponents } from "./components";

const app = createApp(PlatzApp);
app.provide(storeSymbol, createStore());

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});
app.use(router);

const head = createHead();
app.use(head);

app.component("FaIcon", FontAwesomeIcon);
installComponents(app);
app.mount("#app");
