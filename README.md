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

Centralized Error Handling Middleware
Overview:
Modern applications can fail due to database downtime, invalid requests, API timeouts, or unexpected exceptions. Without a central system, errors become scattered, logs become inconsistent, and debugging becomes harder.

A centralized error handler solves these problems by ensuring:
    Uniform error response structure
    Secure handling of sensitive information
    Better observability through structured logs
    Reusable and maintainable error-handling logic

Why Centralized Error Handling Is Important

Consistency
Every error follows the same response format, making frontend integration predictable.

Security
Internal error details and stack traces are hidden in production to protect sensitive information.

Observability
Structured logging makes debugging faster and supports better monitoring.

Maintainability
All error-handling logic lives in one place, reducing repetition across the application.

Structure:
The system is organized into a simple structure:

app/api/          → API route handlers  
lib/logger.ts     → Logging utility  
lib/errorHandler.ts → Centralized error-handling logic

Each route relies on the handler instead of manually handling errors.

How It Works
In Development
    Full error message is shown
    Stack trace is included
    Helps with fast debugging   

In Production
    User receives a safe, generic message
    Stack trace is hidden
    Error details are logged internally for developers
This two-mode behavior balances safety and debugging efficiency.

Logger Functionality:
A structured logger captures:
    Error message
    Log level
    Metadata (context, stack trace)
    Timestamp
This improves visibility into what happened, where, and why.

Usage in API Routes:
API routes wrap logic in a try–catch block.
When an error occurs, they call the centralized handler instead of having separate error logic in each route.
This keeps APIs clean, consistent, and easy to maintain.

Benefits:
Professional and secure error responses
Predictable and uniform API behaviour
Clean and reusable error-handling logic
Better debugging through detailed logs
Minimal exposure of sensitive details in production

Reflection

Centralized error handling makes the entire system more reliable and developer-friendly. Developers get detailed internal logs, while users see safe and clear messages. The design scales well, supports future custom error types, and ensures that every part of the app fails gracefully instead of unpredictably.

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

Centralized Error Handling in Next.js
Overview:
This project demonstrates the implementation of a centralized error handling middleware in a Next.js application. The goal is to catch, categorize, and log all application errors in a consistent manner, while ensuring secure and minimal user-facing responses in production.

Centralized error handling is crucial because modern web applications can fail in many ways, such as API timeouts, database issues, or unexpected exceptions. Without a centralized approach, errors become scattered, logs are inconsistent, and debugging becomes challenging.

Key Features:
Consistency: Every error follows a uniform response format.
Security: Sensitive stack traces are hidden in production.
Observability: Structured logs make debugging and monitoring easier.
Environment-specific behavior: Detailed errors and stack traces in development; safe minimal messages in production.

Project Structure:
The project structure for managing and logging errors is organized as follows:
    app/api/ - API route handlers.
    lib/logger.ts - Custom structured logging utility.
    lib/errorHandler.ts - Centralized error handling function.

Logger Utility:
The logger utility provides structured logging, capturing:
    Log level (info, error)
    Message
    Metadata (e.g., stack trace)
    Timestamp

Centralized Error Handler:
The centralized error handler classifies errors and formats responses based on the environment:
    Development: Returns full error messages and stack traces.
    Production: Logs detailed errors internally, but only sends a safe, minimal message to the user.\

Benefits:
Improved Debugging: Structured logs make it easier to identify the root cause of issues.
User Trust: Redacting sensitive data ensures that users are not exposed to internal system details.
Reusability: A single error handler can manage all errors across the application, reducing repetition.
Scalability: Easy to extend for custom error types such as ValidationError or AuthError.

Reflection:
Implementing a centralized error handler improves both development workflow and user experience. Developers gain detailed insights for debugging while users receive safe, understandable error messages. Structured logging also supports monitoring tools and cloud platforms for observability.

API Route Structure & Naming
Implementation Overview:
Built a complete RESTful API system using Next.js App Router with organized endpoint structure and consistent response handling.

What Was Built:
Users API - Full CRUD operations (GET /api/users, POST /api/users, GET/PUT/DELETE /api/users/[id])
Products API - Product listing and creation with category filtering
Orders API - Order management with pagination
Global Response Handler - Standardized success/error response format

Technical Features
RESTful Design - Resource-based URLs using nouns (users, products) not verbs
Error Handling - Proper HTTP status codes (200, 201, 400, 404, 500) with meaningful messages
Pagination & Filtering - Support for page, limit, search, and category parameters
Input Validation - Required field validation and data type checking
Type Safety - Built with TypeScript for better development experience

Testing & Verification
Comprehensive testing of all CRUD operations
Verified error scenarios (invalid IDs, missing fields, duplicates)
Confirmed pagination and search functionality
Tested both success and error response formats

Key Benefits Achieved
Maintainability
    Predictable endpoint naming makes API self-documenting
    Consistent patterns across all resources
    Easy for new developers to understand and extend

Reduced Integration Errors:
Frontend teams work with uniform response structures
Standardized error handling prevents client-side parsing issues
Clear documentation through consistent behavior

Scalability:
Modular structure allows easy addition of new resources
Global response handler ensures consistency across new endpoints
Flexible filtering and pagination ready for large datasets

Reflection:
This implementation creates a robust foundation that balances developer experience with production reliability. The consistent approach reduces cognitive load for both API consumers and maintainers, while the error handling strategy provides security and good user experience.


Authentication API Documentation
Overview
Secure user authentication system implementing bcrypt password hashing and JWT token management for session handling. Provides robust signup and login functionality with proper input validation and security measures.

API Endpoints
User Registration
The signup endpoint creates new user accounts with secure password storage. All user inputs are validated using Zod schemas to ensure data integrity. The system checks for existing users with duplicate emails or usernames before account creation. Passwords are hashed using bcrypt with 12 salt rounds before storage, ensuring they are never saved in plain text. Upon successful registration, the system generates both access and refresh tokens for immediate authentication.

User Login
The login endpoint authenticates users by verifying credentials against stored records. It validates email format and password presence before database lookup. The system compares the provided password with the hashed version using secure bcrypt comparison. Successful authentication results in new JWT tokens being generated and returned to the client along with user profile information.

Security Implementation
Password Security
Passwords are protected using industry-standard bcrypt hashing with 12 salt rounds. This ensures even if the database is compromised, passwords remain secure. The system enforces strong password policies requiring minimum 8 characters with uppercase, lowercase, and numeric characters.

Token Management
JWT tokens provide stateless authentication with access tokens valid for 15 minutes and refresh tokens lasting 7 days. This balance ensures security through short-lived access tokens while maintaining user convenience with longer-lived refresh tokens. All tokens are signed using secure secrets stored in environment variables.

Input Validation
Comprehensive validation using Zod schemas ensures all incoming data meets required formats and constraints. Email addresses are strictly validated, usernames require minimum length checks, and passwords must meet security standards. This prevents malformed data from reaching the database layer.

Authorization Middleware
Protected routes utilize authentication middleware that verifies JWT tokens before granting access. The middleware extracts tokens from authorization headers, validates their signature and expiration, and provides user context to protected endpoints. Failed authentication returns appropriate HTTP status codes.

Error Handling
The system provides clear error responses for various scenarios including validation failures, authentication errors, duplicate user conflicts, and server issues. All errors follow consistent response formats making them easily handled by client applications.

!(Img/authentication.png)
