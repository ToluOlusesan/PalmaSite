/// <reference types="react/canary" />

// `<ViewTransition>` ships in the React canary channel that the App Router
// bundles — `next/dist/compiled/react` exports it even though the `react`
// package installed in package.json does not. This one reference pulls in the
// matching type declarations project-wide so the component is typed rather
// than cast at each call site.
export {};
