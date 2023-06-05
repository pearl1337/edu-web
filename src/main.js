import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuestic } from "vuestic-ui";
import App from "./App.vue";
import router from "./router";
import "./styles/index.css";
import "vuestic-ui/styles/essential.css";
import "vuestic-ui/styles/grid.css";
// import "vuestic-ui/styles/reset.css";
// import "vuestic-ui/styles/typography.css";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faUserSecret);

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(createVuestic());
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("QuillEditor", QuillEditor);

app.mount("#app");
