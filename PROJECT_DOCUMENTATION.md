# Political Intelligence Platform Documentation

## Overview

The Political Intelligence Platform is a comprehensive digital ecosystem designed to enhance civic engagement, transparency, and political accountability. It provides tools for citizens, politicians, and organizations to interact, track performance, and participate in the democratic process.

## Tech Stack

- **Frontend**: Next.js (React), Tailwind CSS, Lucide React
- **Backend**: Next.js Server Actions, Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL
- **Deployment**: Vercel (recommended) / Node.js

## Project Structure

### `/app`

The core application logic, following the Next.js App Router structure.

- **(platform)**: Main application routes including:
  - `marketplace`: Marketplace for political services and products.
  - `campaign`: Tools for campaign management.
  - `tallying`: Election tallying and results visualization.
  - `policies`: Policy tracking and analysis.
  - `representatives`: Profiles and performance tracking for elected officials.
  - `community`: Community engagement forums and tools.
- `api`: Backend API routes.
- `auth`: Authentication routes.

### `/components`

Reusable UI components, likely built with Shadcn UI or similar libraries.

### `/lib`

Utility functions, database clients (Supabase), and shared logic.

### `/supabase`

Database configuration, migration files, and SQL scripts.

## Key Features

### 1. Marketplace

A dedicated space for political services, merchandise, and tools. Users can list items, browse categories, and make purchases.

### 2. Campaign HQ

A suite of tools for political campaigns, including volunteer management, fundraising, and communication.

### 3. Tallying Center

Real-time election results tracking and visualization, providing transparency in the electoral process.

### 4. Policy & Legislation

Track bills, policies, and legislative activities. Users can view voting records and analysis.

### 5. Representatives

Profiles of elected officials with performance metrics, voting history, and contact information.

## Database Schema (Overview)

The database is built on PostgreSQL via Supabase. Key tables include:

- `users`: Core user profiles.
- `profiles`: Extended user details.
- `campaigns`: Campaign data.
- `products`: Marketplace items.
- `orders`: Transaction records.
- `policies`: Legislative documents.
- `votes`: Voting records.

_(Refer to `/supabase/schema.sql` for the full schema definition)_

## Setup & Installation

1.  **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd political-intelligence
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file with the following:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run Development Server**:

    ```bash
    npm run dev
    ```

5.  **Build utilizing Production**:
    ```bash
    npm run build
    npm start
    ```

## Contributing

Please follow the standard pull request process. Ensure all code is linted and tested before submission.
