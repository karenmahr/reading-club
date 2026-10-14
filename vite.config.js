import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  publicDir: "../public",

  build: {
  outDir: "../dist",
  rollupOptions: {
    input: {
      main: resolve(__dirname, "src/index.html"),
      myClub: resolve(__dirname, "src/my-club/index.html"),
      myBooks: resolve(__dirname, 'src/my-books/index.html'),
      poll: resolve(__dirname, 'src/poll/index.html'),
      survey: resolve(__dirname, 'src/survey/index.html'),
    },
  },
},
});