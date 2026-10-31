# Decision Making Tool

**Decision Making Tool** is a single-page application (SPA) built with **vanilla JavaScript, without using any third-party frameworks**, that helps users make random decisions based on weighted options.

The application consists of two sections: **List of Options** and **Decision Picker**. Users can create, edit, and delete options, assign weights to them, and import options from CSV-formatted text. Lists can also be saved to and loaded from JSON files.

The **Decision Picker** visualizes the selection process using an interactive spinning wheel built with the Canvas API. Each sector represents an option, with its size proportional to the assigned weight. The application also features spinning animations, sound effects, and a display of the selected option.

User data and settings are persisted between sessions.

[Deploy](https://intrstng.github.io/Completed-tasks-from-JSFE2024Q4/decision-making-tool/)

## Technologies:
TypeScript, HTML5, CSS3, Canvas API, DOM API, File API, Web Storage API, History API, Vite.

## Screenshot

![Capture1](https://private-user-images.githubusercontent.com/107413715/423660333-dbcdf576-3fec-4101-b372-7942b7d6ce69.PNG?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3OTM0NjMwNTQsIm5iZiI6MTc5MzQ2Mjc1NCwicGF0aCI6Ii8xMDc0MTM3MTUvNDIzNjYwMzMzLWRiY2RmNTc2LTNmZWMtNDEwMS1iMzcyLTc5NDJiN2Q2Y2U2OS5QTkc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYxMDMxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MTAzMVQxNjA1NTRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03ZmFjZWExNzE1ZjcyZWU2ZTJiZTFkYWYxZTljMTQzZTczOGM3YzFiYmVjYjM5NTJkMmViN2ZjOTgzMmUxMGMyJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZwbmcifQ.jghmf44fqo0PzAPoYMU4vBsJXxp70JtZgD3V7FAdGCQ)
![Capture2](https://private-user-images.githubusercontent.com/107413715/690508485-704049e1-8303-4570-9970-3c1a62c76933.PNG?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3OTM0NjMwNTQsIm5iZiI6MTc5MzQ2Mjc1NCwicGF0aCI6Ii8xMDc0MTM3MTUvNjkwNTA4NDg1LTcwNDA0OWUxLTgzMDMtNDU3MC05OTcwLTNjMWE2MmM3NjkzMy5QTkc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYxMDMxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MTAzMVQxNjA1NTRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT00M2YzNmRlNGVjZWJkNWU2OTYzMmUxNDg0YzBkZjRhMDBlMTZmMGNhY2ViNDY2YTMwNTk1NDczZWRiZWU3NmFmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZwbmcifQ.qA1P5v9B43qcAoQ1dhyTvnWXkQrLNng948YFM5BOXL0)

## Getting Started 🚀

Follow these steps to run the application locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Intrstng/Completed-tasks-from-JSFE2024Q4.git
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd Completed-tasks-from-JSFE2024Q4
    ```

3.  **Switch to the `decision-making-tool` branch:**

    ```bash
    git checkout decision-making-tool
    ```

4.  **Install dependencies:**

    ```bash
    npm install
    ```

    If you have problems with running the script, use the following command in the CLI:

    ```bash
    npm install --legacy-peer-deps
    ```

5.  **Start the development server:**

    ```bash
    npm run start
    ```

6.  **Access the application:**

    *   Open your browser and navigate to the link provided in the CLI.

## Available Scripts ⚙️

*   **`start`:** 💻 Starts the **Webpack** development server.

    ```bash
    npm run start
    ```

*   **`build`:** 📦 Builds the application for production.

    ```bash
    npm run build
    ```

*   **`serve`:** 🚀 Starts the **Webpack** development server for local development (alternative dev server start script).

    ```bash
    npm run serve
    ```
    
*   **`lint`:** 🔍 Runs ESLint to check for code quality issues.

      ```bash
      npm run lint
      ```

*   **`lint-fix`:** 🐛 Automatically fixes ESLint errors.

    ```bash
    npm run lint-fix
    ```

*   **`stylelint-check`:** 🎨 Checks CSS files for stylelint errors.

    ```bash
    npm run stylelint-check
    ```

*   **`stylelint-fix`:** 🔧 Automatically fixes CSS stylelint errors.

    ```bash
    npm run stylelint-fix
    ```

*   **`format-check`:** ✅ Checks code formatting with Prettier.

    ```bash
    npm run format-check
    ```

*   **`format-fix`:** ✨ Automatically formats code with Prettier.

    ```bash
    npm run format-fix
    ```

*   **`prepare`:** ⚙️A lifecycle script that Husky uses to set up Git hooks. This is automatically run after `npm install`.

    ```bash
    npm run prepare
    ```

*   **Commit-msg Hooks (Husky):** 📝 Commitlint is triggered by Git after a *user* has entered a *commit message* but before the commit is actually created.

*   **Pre-commit Hooks (Husky):** 🔒 ESLint, Stylelint and Prettier are automatically run during `git commit` operations.

