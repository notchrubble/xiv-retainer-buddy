declare module "*.css" {
  // This tells TypeScript that any import from a file ending in .css
  // is a valid module. The body of the module is usually irrelevant
  // for CSS imports, which are side-effect only.
}
