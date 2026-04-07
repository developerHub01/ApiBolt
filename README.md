<div align="center">
  <img src="https://raw.githubusercontent.com/developerHub01/ApiBolt/refs/heads/development/preview/og.png" alt="ApiBolt Banner" width="400"/>

# ApiBolt

**A powerful, modern REST API client for efficient API development.**

[![Release](https://img.shields.io/github/v/release/developerHub01/ApiBolt?style=for-the-badge&logo=github&color=FF5733)](https://github.com/developerHub01/ApiBolt/releases)
[![Website](https://img.shields.io/badge/Website-apibolt.com-blue?style=for-the-badge&logo=world&logoColor=white)](https://apibolt.vercel.app)
[![License](https://img.shields.io/github/license/developerHub01/ApiBolt?style=for-the-badge&color=2E86C1)](/LICENSE)
[![Issues](https://img.shields.io/github/issues/developerHub01/ApiBolt?style=for-the-badge&logo=github&color=C70039)](https://github.com/developerHub01/ApiBolt/issues)
[![Stars](https://img.shields.io/github/stars/developerHub01/ApiBolt?style=for-the-badge&logo=github&color=FFC300)](https://github.com/developerHub01/ApiBolt/stargazers)

</div>

ApiBolt is a feature-rich REST API client designed to streamline the workflow of developers. Built with Electron and React, it offers a seamless and intuitive desktop experience for testing, debugging, and interacting with APIs. Whether you are building new integrations or troubleshooting existing endpoints, ApiBolt provides a comprehensive suite of tools to enhance your productivity.

The application is currently in active development, with many more exciting features planned for the future.

## ✨ Features

ApiBolt comes packed with a wide range of features to supercharge your API development:

- **Full Request Customization**: Craft complex API requests with support for various methods (GET, POST, PUT, DELETE, etc.), headers, and body types (JSON, form-data, x-www-form-urlencoded).
- **Organized Collections**: Group your API requests into folders and collections for better organization and management.
- **Environment Variables**: Manage different environments (e.g., development, staging, production) with ease, using environment-specific variables in your requests.
- **Detailed Response Viewer**: Inspect API responses with a clear and organized viewer, including status codes, headers, and formatted JSON.
- **Request History**: Keep track of all your past requests for easy access and re-execution.
- **Authentication Helpers**: Simplified authentication with support for various methods like Bearer Token and Basic Auth.
- **Code Snippet Generation**: Generate client-side code snippets for your requests in various languages and frameworks.
- **Customizable Themes**: Personalize your workspace with a theme editor and a marketplace for community-created themes.
- **Keyboard Shortcuts**: Boost your efficiency with a comprehensive set of keyboard shortcuts.
- **Local Password Protection**: Secure your projects with an optional local password.
- **Cross-Platform**: Available for Windows, macOS, and Linux.

## 🌐 Website

The official website for ApiBolt is available at [apibolt.vercel.app](https://apibolt.vercel.app/). Here you can find more information about the application, download the latest version, and stay up-to-date with the latest news and announcements.

The source code for the website is available on GitHub: [ApiBolt-web](https://github.com/developerHub01/ApiBolt-web)

## 🗺️ Roadmap

ApiBolt is under active development, and we have many exciting features planned for the future. Here's a glimpse of what's coming:

- **WebSocket and gRPC Support**: Expanding beyond REST to support other popular API protocols.
- **Advanced Scripting**: Adding pre-request and post-request scripting capabilities for more complex workflows.
- **Plugin Architecture**: Introducing a plugin system to allow the community to extend the functionality of ApiBolt.
- **Team Collaboration**: Features to allow teams to share collections and collaborate on API development.

Stay tuned for more updates as we continue to improve and expand the capabilities of ApiBolt.

## 🚀 Getting Started

Follow these instructions to get ApiBolt up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [pnpm](https://pnpm.io/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/developerHub01/ApiBolt.git
    cd ApiBolt
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

### Running the Application

- **Development Mode:**

  To run the app in development mode with hot-reloading:

  ```bash
  pnpm dev
  ```

- **Preview Mode:**

  To preview the production build locally:

  ```bash
  pnpm start
  ```

## 🖥️ Building the Application

You can build the application for different operating systems using the following commands:

- **Build for your current OS:**

  ```bash
  pnpm build
  ```

- **Build for a specific OS:**

  ```bash
  pnpm build:win
  pnpm build:mac
  pnpm build:linux
  ```

## 🛠️ Tech Stack

ApiBolt is built with a modern and powerful tech stack to ensure a robust and scalable application:

- **[Electron](https://www.electronjs.org/)**: The foundation of our desktop app, allowing us to build a cross-platform application with web technologies.
- **[React](https://react.dev/)**: Powers the user interface, providing a reactive and component-based architecture for a dynamic user experience.
- **[TypeScript](https://www.typescriptlang.org/)**: Brings static typing to JavaScript, enhancing code quality and developer productivity.
- **[Redux Toolkit](https://redux-toolkit.js.org/)**: Manages the application's state in a predictable and centralized way.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework that allows for rapid UI development and easy customization.
- **[Shadcn UI](https://ui.shadcn.com/)**: A collection of beautifully designed and accessible UI components that form the backbone of our design system.
- **[Drizzle ORM](https://orm.drizzle.team/)**: A modern TypeScript ORM used to interact with the local SQLite database, ensuring type safety and ease of use.
- **[Vite](https://vitejs.dev/)**: Provides a blazing-fast development server and build tool, significantly improving the development workflow.

## 🗂️ Database Schema

The database schema for ApiBolt is designed to be simple and efficient. You can view the Entity-Relationship Diagram (ERD) to understand the relationships between the different tables.

- **[View the ERD (PDF)](/ERD.pdf)**
- **[View the ERD (SVG)](/ERD.svg)**
- **[View the Live ERD on Lucidchart](https://lucid.app/lucidchart/66e0b917-b198-4138-86c7-2c5d74893695/edit?viewport_loc=-3418%2C-1135%2C539%2C255%2C0_0&invitationId=inv_4381e06e-813c-4228-9e8c-7596006b186f)**

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features, bug fixes, or improvements, feel free to open an issue or submit a pull request. Please read our contributing guidelines before getting started. (Note: A formal `CONTRIBUTING.md` file is yet to be created).

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🖼️ Preview

<div align="center">

|                                                  Splash Screen                                                   |                                                  Local Password                                                   |
| :--------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: |
| ![Splash Screen](https://raw.githubusercontent.com/developerHub01/ApiBolt/refs/heads/development/preview/01.png) | ![Local Password](https://raw.githubusercontent.com/developerHub01/ApiBolt/refs/heads/development/preview/02.png) |

|                                                  Projects                                                   |                                                  Collections                                                   |
| :---------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------: |
| ![Projects](https://raw.githubusercontent.com/developerHub01/ApiBolt/refs/heads/development/preview/03.png) | ![Collections](https://raw.githubusercontent.com/developerHub01/ApiBolt/refs/heads/development/preview/06.png) |

|                                                  Request Interface                                                   |                                                  History                                                   |
| :------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: |
| ![Request Interface](https://raw.githubusercontent.com/developerHub01/ApiBolt/refs/heads/development/preview/09.png) | ![History](https://raw.githubusercontent.com/developerHub01/ApiBolt/refs/heads/development/preview/11.png) |

|                                                  Environments                                                   |                                                  Marketplace                                                   |
| :-------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------: |
| ![Environments](https://raw.githubusercontent.com/developerHub01/ApiBolt/refs/heads/development/preview/12.png) | ![Marketplace](https://raw.githubusercontent.com/developerHub01/ApiBolt/refs/heads/development/preview/14.png) |

|                                                  Theme Editor                                                   |                                                  Settings                                                   |
| :-------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: |
| ![Theme Editor](https://raw.githubusercontent.com/developerHub01/ApiBolt/refs/heads/development/preview/15.png) | ![Settings](https://raw.githubusercontent.com/developerHub01/ApiBolt/refs/heads/development/preview/18.png) |

</div>
