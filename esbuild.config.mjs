import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";
import {inlineWorkerPlugin} from "@aidenlx/esbuild-plugin-inline-worker"
import postCss from "esbuild-style-plugin"
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"
import fs from "fs";

const changeCSSName = {
	name: "change-css-name",
	setup(build) {
		build.onEnd(() => {
			if(fs.existsSync("main.css")) {fs.renameSync("main.css", "styles.css")}
		})	
	}
}

const banner =
`/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;

const prod = (process.argv[2] === "production");

const context = await esbuild.context({
  banner: {
    js: banner,
  },
  entryPoints: ["src/main.ts"],
  bundle: true,
  external: [
    "obsidian",
    "electron",
    "@codemirror/autocomplete",
    "@codemirror/collab",
    "@codemirror/commands",
    "@codemirror/language",
    "@codemirror/lint",
    "@codemirror/search",
    "@codemirror/state",
    "@codemirror/view",
    "@lezer/common",
    "@lezer/highlight",
    "@lezer/lr",
    ...builtins],
  format: "cjs",
  target: "es2018",
  logLevel: "info",
  sourcemap: prod ? false : "inline",
  treeShaking: true,
  plugins: [
    changeCSSName,
    inlineWorkerPlugin({
      watch: true,
      buildOptions: () => ({})
    }),
    postCss({
      postcss: {
        plugins: [tailwindcss, autoprefixer]
      }
    })
  ],
  minify: prod,
  outfile: "main.js",
});

if (prod) {
  await context.rebuild();
  process.exit(0);
} else {
  await context.watch();
}
