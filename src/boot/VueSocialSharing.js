import { boot } from "quasar/wrappers";
import SocialSharing from "vue-social-sharing";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  app.use(SocialSharing);
});

