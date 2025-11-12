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

!(Img/Lint.png)

Environment Variable Management

Files Created:

.env.local → stores real credentials like DATABASE_URL, JWT_SECRET, and API_KEY (not pushed to GitHub).
.env.example → sample file with placeholder values for setup reference.
.gitignore → includes .env.local to protect secrets from being committed.

Variables Used

Server-side Variables:
DATABASE_URL, JWT_SECRET, API_KEY — accessible only in the backend and never exposed to the client.

Client-side Variables:
NEXT_PUBLIC_API_BASE_URL — safe to expose to the frontend and used for public API calls.

Safe Usage Example:

// Backend only
const dbUrl = process.env.DATABASE_URL;

// Frontend safe variable
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

Why Environment Variables Matter: 

Keeps sensitive data secure and out of source control.
Maintains clean configuration for all environments (development, staging, production)
Prevents accidental exposure of API keys or database URLs.
Ensures easy onboarding using .env.example as a reference file.
Build-time vs Runtime

In Next.js, environment variables are loaded at build time.
This means if you modify .env.local, you must restart the development server to apply changes.
Client-side variables (those starting with NEXT_PUBLIC_) are bundled during the build and can be safely accessed in browser code.

Reflection

If a teammate accidentally pushed .env.local to GitHub, all sensitive credentials — like database URLs or API keys — would become public.
My setup prevents this by:
Adding .env.local to .gitignore (so it never gets committed).
Providing .env.example with safe placeholder values for teammates to replicate their setup securely.

!(Img/env.png)


PostgreSQL Schema Design for Project Management App

This project demonstrates the design of a normalized relational database schema for a project management application using PostgreSQL. The schema is designed to manage users, projects, and tasks efficiently while maintaining data consistency, scalability, and easy querying.

Core Entities:
User — Represents registered users or team members.
Project — Represents ongoing or completed projects.
Task — Represents individual tasks within a project.
Optional Entities — Comment (for task/project notes), Team (for grouping users).

Keys, Constraints & Relationships:
Primary Keys (PKs): Each table has a unique identifier for records.
Foreign Keys (FKs): Projects are linked to Users, and Tasks are linked to Projects.
- Constraints:
    Unique fields such as email for users.
    Required fields enforced as NOT NULL.
    Cascade deletes ensure related tasks/projects are removed when the parent is deleted.
Indexes: Applied on primary keys and frequently queried fields to optimize performance.

Normalization:
1NF (First Normal Form): All fields contain atomic values; no repeating groups exist.
2NF (Second Normal Form): All non-key attributes fully depend on the primary key.
3NF (Third Normal Form): Eliminates transitive dependencies; all attributes depend only on the primary key.


Reflections:    
Scalability: The schema can accommodate new entities such as Comments or Teams without major restructuring.
Efficient Queries: Supports common operations such as fetching all tasks for a project, listing projects per user, and filtering tasks by status.
Design Rationale: Normalization ensures a consistent data model, reduces redundancy, and simplifies maintenance.

Migrations & Seeding (Summary):
Database tables were created using PostgreSQL migrations.
Sample records were added to test relationships and ensure data consistency.
Schema verified through database exploration tools.

Documentation & Resources:
ER diagrams or schema illustrations to visualize relationships.
PostgreSQL documentation on table constraints and indexes.
Guides on database normalization and best practices.

!(Img/PostgreSQL.png)
