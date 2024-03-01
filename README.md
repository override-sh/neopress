<a alt="NeoPress" href="https://neopress.gitbook.io/neopress/" target="_blank" rel="noreferrer">
<img src="https://raw.githubusercontent.com/override-sh/neopress/main/_assets/logo.png">
</a>

## Introduction

NeoPress is a full-stack content management system (CMS) built with Next.js and Nx, offering a powerful and
user-friendly solution for managing your website content. Designed with extensibility, security, and performance in
mind, NeoPress empowers you to create and maintain dynamic websites with ease.

## Features

Integrated UI: Manage content directly within the intuitive browser-based interface, eliminating the need for separate
headless CMS solutions.

* **Next.js framework**: Leverage the robust features and performance optimization of Next.js for a seamless user
  experience.
* **Nx monorepo management**: Efficiently manage the entire codebase, including frontend, backend, and shared
  components, within a single workspace.
* **Extensible architecture**: Easily extend NeoPress functionality through plugins and custom modules, tailoring it to
  your specific needs.
* **Robust security**: Built with security best practices in mind to protect your content and user data.
* **Performance-focused**: Optimized for speed and scalability, ensuring a smooth experience for your website visitors.

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/en/download/) version 20.x or newer:
    * When installing Node.js, you are recommended to check all checkboxes related to dependencies.
    * We recommend using [NVM](https://github.com/nvm-sh/nvm) to manage your Node.js versions.
* [PNPM](https://pnpm.io/installation) version 8.x or newer globally installed:
    * `npm install -g pnpm`
* [NX](https://nx.dev/) globally installed:
    * `pnpm install -g nx@latest`
* A strong foundation in JavaScript and TypeScript:
    * We recommend reading [The Modern JavaScript Tutorial](https://javascript.info/)
      and [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html).
    * This project uses [ESLint](https://eslint.org/) to enforce code quality and consistency.

### Installation

1) Clone the NeoPress repository

```bash
git clone https://github.com/your-username/neopress.git
```

2) Navigate to the project directory and install the dependencies

```bash:
cd neopress
pnpm install
```

### Development

1) Start the development server:

```bash
nx run neopress:serve
```

This will start the Next.js development server and the Nx workspace, allowing you to work on different parts of the
project simultaneously.

2) Access the CMS UI in your browser by navigating to [http://localhost:3000](http://localhost:3000)