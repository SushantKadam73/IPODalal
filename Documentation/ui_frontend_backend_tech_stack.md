---
description: This document outlines the technology stack chosen for the User Interface (UI), Frontend, and Backend of the IPO Dalal project, considering the project's aesthetic, performance, and functional requirements.
globs: 
alwaysApply: true
---
# IPO Dalal Project Documentation: UI, Frontend, and Backend Tech Stack

**File Description:** This document outlines the technology stack chosen for the User Interface (UI), Frontend, and Backend of the IPO Dalal project, considering the project's aesthetic, performance, and functional requirements.

## 1. UI/UX Design Principles

The UI/UX design for IPO Dalal will adhere to the following principles:

*   **Aesthetic and Minimalistic Theme:**  A clean, uncluttered design focusing on essential information and ease of use. The visual style will be modern and aesthetically pleasing without unnecessary distractions.
*   **Light, Dark, and System Default Themes:**  Users will be able to choose between light and dark themes, with an option to follow the system's default theme setting for optimal user experience across different environments.
*   **Indian Numbering System and ₹ Symbol:** All monetary values will be displayed using the Indian numbering system (Lakhs, Crores) and prefixed with the ₹ symbol for clear and culturally relevant financial representation.
*   **Visual Hierarchy:**  Information will be structured with a clear visual hierarchy to guide the user's eye and emphasize important data points. This includes using font sizes, spacing, and visual cues to prioritize content.
*   **Fast and Efficient Website:** Performance is a key priority. The frontend will be built to ensure fast loading times, smooth interactions, and efficient data rendering.
*   **Responsive Design:** The website will be fully responsive, ensuring optimal viewing and functionality across desktops, tablets, and mobile devices.

**Color Palette:**

*   **Background:** `#E4E5E4`
*   **Highlight Shades (Yellow):** `#E7D100`, `#FFF6AD`, `#FEF48A`, `#FEF065`, `#FEE600`
*   **Hover Color (White-like):** `#E9E9E9`
*   **Text Box/Element Shades (Grey):** `#E9E9E9`, `#E5E5E5`, `#D4D4D4`, `#A3A3A3`
*   **"Closing/Opening Today" Box:** `#D4D4D4`

**Styling:**

*   **Table Borders:** `border p-3 shadow-hard` (using Tailwind CSS classes from Shadcn UI or similar)

## 2. Frontend Tech Stack

*   **Framework:** **Next JS**
    *   **Purpose:** To build a dynamic, interactive, and component-based user interface. Next JS's component architecture promotes reusability and maintainability, crucial for a feature-rich dashboard. Next JS ensures we are using the latest stable and performant version.
    *   **Language:** **JavaScript (JS)** - The primary language for Next JS development.

*   **UI Library & Component Library:** **Shadcn UI**
    *   **Purpose:** To provide a set of pre-designed, aesthetically pleasing, and accessible UI components. Shadcn UI, built on Tailwind CSS and Radix UI, aligns perfectly with the minimalistic and modern aesthetic goal. It offers excellent customization and utility-first styling via Tailwind CSS, enhancing development speed and design consistency.
    *   **Rationale for Choosing Shadcn UI over Material-UI:** While Material-UI is a robust component library, Shadcn UI's unstyled nature and direct component integration offer greater flexibility for achieving a truly minimalistic and customized aesthetic. Focusing on Shadcn UI will streamline development and avoid potential style conflicts between multiple component libraries.

*   **Styling Utility:** **Tailwind CSS (Integrated with Shadcn UI)**
    *   **Purpose:** For utility-first CSS styling, enabling rapid and consistent styling by applying utility classes directly in the component markup. Tailwind CSS is fundamental to customizing Shadcn UI components and achieving the desired visual theme.

*   **State Management:** **Zustand**
    *   **Purpose:** For simple and scalable state management within the Next JS application. Zustand is a minimalistic and unopinionated state management library well-suited for Next JS, offering ease of use and good performance.

*   **Charting Library:** **Recharts**
    *   **Purpose:** To render interactive and visually appealing charts and graphs for displaying IPO data (e.g., GMP trends, subscription rates). Recharts is a Next JS-based composable charting library that is lightweight and highly customizable, fitting the aesthetic and performance requirements.

## 3. Backend Tech Stack

*   **Framework:** **Express.js**
    *   **Purpose:** To build the backend API for the IPO Dalal project. Express.js is a lightweight and flexible Node.js framework, ideal for creating RESTful APIs to serve data to the Next JS frontend.
    *   **Language:** **JavaScript (JS)** - Backend logic will be written in JavaScript, aligning with the frontend language for potential full-stack JavaScript development and team familiarity.
    *   **PERN Stack Context:**  While the request mentions PERN stack, and PostgreSQL is chosen as the database,  Express.js is being used here instead of a purely "PostgREST" approach (which directly exposes PostgreSQL as a REST API). Express.js provides more flexibility for custom business logic, data processing, and potentially more complex API endpoints beyond simple database CRUD operations.

## 4. Deployment Platform

*   **Platform:** **Vercel**
    *   **Purpose:** For easy and efficient deployment of both the frontend Next JS application and potentially the backend API (if Node.js backend is also deployed on Vercel). Vercel is known for its seamless integration with modern frontend frameworks like Next JS and its excellent performance and global CDN.

This tech stack is specifically chosen to meet the aesthetic, performance, responsiveness, and functional requirements of the IPO Dalal project, providing a modern, efficient, and maintainable platform.