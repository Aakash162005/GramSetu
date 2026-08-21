# GramSetu

Connecting Villages, Empowering Communities. 

GramSetu is a modern, digital portal designed to bridge the gap between rural citizens and Gram Panchayat services. It provides a unified platform to access government schemes, request village services, lodge complaints, and stay updated with local announcements.

## Features

- **Dashboard**: A personalized view showing recent activities, pending requests, and eligible schemes.
- **Government Schemes**: A comprehensive directory of central and state government schemes with search and filter capabilities.
- **Village Services**: Request essential certificates and administrative services directly through the digital portal.
- **Grievance Redressal**: Lodge complaints regarding infrastructure, water supply, or other village issues and track their status.
- **Announcements & Events**: Stay updated with the latest news, notices, and important information from your Gram Panchayat.
- **Profile Management**: Maintain personal information and track account status.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Library**: React
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app`: Contains all Next.js pages and routes.
- `/components`: Contains reusable UI components (e.g., buttons, cards, modals) and layout components (navbar, footer).
- `/context`: Contains the React Context used for global state management and mock data provider.
- `/data`: Contains mock data files used to simulate backend API responses.

## Note on Mock Data
Currently, this project uses mock data to demonstrate its functionality. Authentication is simulated, and any changes made (like submitting a complaint) will only persist within the current session. Use `9876543210` and `password` to log in for demonstration purposes.
