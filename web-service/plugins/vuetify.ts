import "@mdi/font/css/materialdesignicons.css";
import { createVuetify, type ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import { fr } from "vuetify/locale";
import { VCalendar } from "vuetify/labs/VCalendar";
import { VTimePicker } from "vuetify/labs/VTimePicker";

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#ffffff",
    surface: "#ffffff",
    primary: "#1883BF",
    secondary: "#FABB17",
    error: "#e63946",
    info: "#ffb703",
    success: "#16db65",
    warning: "#fb8500",
  },
};

const myCustomDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#1c1d23",
    surface: "#343640",
    primary: "#1883BF",
    secondary: "#FABB17",
    error: "#e63946",
    info: "#ffb703",
    success: "#16db65",
    warning: "#fb8500",
  },
};

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      VCalendar,
      VTimePicker,
    },
    directives,
    locale: {
      locale: "fr",
      fallback: "en",
      messages: { fr },
    },
    theme: {
      defaultTheme: "myCustomLightTheme",
      themes: {
        myCustomLightTheme,
        myCustomDarkTheme,
      },
    },
  });
  app.vueApp.use(vuetify);
});