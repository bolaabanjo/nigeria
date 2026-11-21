import { registerHooks } from "node:module";
import { extname } from "node:path";

const root = new URL("../../", import.meta.url);
const sourceDirectories = ["app/", "lib/"].map((directory) => new URL(directory, root).href);

// Mirror the app's TypeScript imports when invoking its server modules outside Next.js.
registerHooks({
  resolve(specifier, context, nextResolve) {
    const parent = context.parentURL;
    if (parent && sourceDirectories.some((directory) => parent.startsWith(directory))) {
      if (specifier.startsWith("@/")) {
        return nextResolve(new URL(specifier.slice(2) + ".ts", root).href, context);
      }
      if (specifier.startsWith(".") && !extname(specifier)) {
        return nextResolve(new URL(specifier + ".ts", parent).href, context);
      }
    }
    return nextResolve(specifier, context);
  },
});
