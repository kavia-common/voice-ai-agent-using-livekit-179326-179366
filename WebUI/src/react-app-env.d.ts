/* Declaration file to satisfy TypeScript syntax used in .tsx files within CRA.
   CRA can transpile TSX only if TypeScript is installed, but we only use TS types
   for developer tooling. These declarations avoid type checking at build time. */
declare module '*.tsx';
declare module '*.ts';
