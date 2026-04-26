import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";

import {schemaTypes} from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "Yogesh K. Desai Website",
  projectId: "arzxzk0s",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
