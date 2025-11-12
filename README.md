# TrueTrip

A full-stack Next.js (TypeScript) project for building a transparent and efficient travel supply-chain system powered by AWS and Azure.

---

## 📁 Folder Structure

src/
├── app/ # Routes & pages (App Router)
├── components/ # Reusable UI components
├── lib/ # Utilities, helpers, and configuration files
public/ # Static assets such as images, icons, etc.

TypeScript, ESLint & Prettier Setup

TypeScript

- `tsconfig.json` has `strict: true`, `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters` to catch bugs at compile time.

ESLint + Prettier

- `.eslintrc.json` extends `next/core-web-vitals`, `plugin:@typescript-eslint/recommended`, `plugin:prettier/recommended`.
- Rules: `no-console: warn`, `semi: ["error","always"]`, `quotes: ["error","double"]`.

Pre-commit Hooks

- Husky + lint-staged runs `eslint --fix` and `prettier --write` on staged files to ensure code quality before commit.

Why

- Strict TypeScript reduces runtime bugs by enforcing types during development.
- ESLint enforces consistent code style and catches common errors early.
- Pre-commit hooks prevent accidental bad code being committed to the repo.

!(Img/lint.png)
