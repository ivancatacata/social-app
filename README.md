#  Social App

A modern social feed application built with **Angular 18**, leveraging **SSR**, **Signals**, and a clean UI powered by **Tailwind CSS**.

Public URL: https://social-app-umber-eta.vercel.app/login

---

##  SSR Strategy

The application uses **Angular Server-Side Rendering (SSR)** to optimize performance and initial load experience.

### Route behavior

- **`/feed`**
  - Rendered on the server (SSR)
  - Uses a route resolver to fetch initial posts
  - Content is included in the first HTML response

- **`/login`**
  - Client-side rendered (CSR)
  - Optimized for interactivity (form handling, validation)

>  Authentication is handled on the client using `localStorage`, so SSR is applied only to non-authenticated content.

---

##  Tech Stack

- **Angular 18**
  - Standalone components
  - Lazy loading
  - Angular SSR (Universal)

- **NgRx Signals Store**
  - Reactive state management using Angular signals
  - Co-located logic (state, computed, methods)

- **Tailwind CSS v4**
  - Utility-first styling
  - CSS-native configuration

- **LocalStorage**
  - Session persistence
  - Feed state (posts, likes, comments)

---
##  Installation

```bash
cd social-app
npm install
```
---

##  Demo Credentials

```bash
Email:    oliver@queen.com
Password: password123
