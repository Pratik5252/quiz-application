# Quiz Application

A full-stack quiz application built with React, TypeScript, Express.js, and PostgreSQL. This application allows users to take quizzes with multiple-choice questions and view their results.

Check out the live demo: [Quiz Application](https://quiz-application-night.vercel.app/)

## Project Overview

This project consists of two main components:

-   **Frontend (Client)**: A React-based web application built with Vite, TypeScript, and TailwindCSS
-   **Backend (Server)**: An Express.js API server with PostgreSQL database using Prisma ORM


## Application Flow

### User Journey

```mermaid
graph TD
    A[User visits app] --> B[Start Quiz Page]
    B --> C[Click 'Start Quiz']
    C --> D[Fetch questions from API]
    D --> E[Display first question]
    E --> F[User selects answer]
    F --> G[Store answer in context]
    G --> H{More questions?}
    H -->|Yes| I[Next question]
    I --> E
    H -->|No| J[Submit all answers to API]
    J --> K[Calculate score on server]
    K --> L[Return score & correct answers]
    L --> M[Display Results Page]
    M --> N[Show score, percentage, correct answers]
    N --> O[Option to restart quiz]
    O --> B
```

### Technical Flow

```
Frontend (React)         →     Backend (Express)    →     Database (PostgreSQL)
        ↓                              ↓                           ↓
1. Request questions     →    Get /api/quiz/questions    →    SELECT * FROM quiz
2. Store answers locally
3. Submit answers        →    POST /api/quiz/submit  →    Compare with correct answers
4. Display results       ←    Return score & data   ←    Calculate final score
```

### State Management

- **AnswerContext**: Manages user answers across components
- **Timer State**: Countdown for the quiz
- **Navigation State**: Current question index and progress
- **Result State**: Final score and correct answers display

## Features

-   Interactive quiz interface with multiple-choice questions
-   Timer functionality for quiz sessions
-   Score calculation and results display
-   REST API for quiz data management
-   Database seeding with sample quiz questions
-   Responsive design with TailwindCSS

## Tech Stack

### Frontend

-   React 19
-   TypeScript
-   Vite
-   TailwindCSS
-   React Router DOM
-   React Query (TanStack Query)

### Backend

-   Node.js
-   Express.js
-   TypeScript
-   Prisma ORM
-   PostgreSQL

## Prerequisites

Before running this application, make sure you have the following installed:

-   Node.js (v18 or higher)
-   pnpm (recommended) or npm
-   PostgreSQL database

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Pratik5252/quiz-application.git
cd quiz-application
```

### 2. Database Setup

1. Create a PostgreSQL database for the application
2. Create a `.env` file in the `server/src` directory and add your database connection:

```
DATABASE_URL="postgresql://username:password@localhost:5432/db_name"
VITE_API_URL="http://localhost:5173"
```

### 3. Server Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
pnpm install or npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name [migration_name]

# Seed the database with sample data
pnpm prisma:seed or npm run prisma:seed

# Start the development server
pnpm dev or npm run dev
```

The server will start on `http://localhost:3000`

### 4. Client Setup

```bash
# Navigate to client directory (from root)
cd client

# Install dependencies
pnpm install or npm install

# Add the .env file with your API endpoint (if different)
VITE_API_URL=http://localhost:3000

# Start the development server
pnpm dev or npm run dev
```

The client will start on `http://localhost:5173`

## API Endpoints

##### Get Quiz Questions

`GET /api/quiz/questions` - Fetch all quiz questions

**Response:**

```json
[
    {
        "id": "uuid-1",
        "question": "What is the capital of France?",
        "options": ["London", "Berlin", "Paris", "Madrid"],
        "answer": 2
    },
    {
        "id": "uuid-2",
        "question": "What is 2 + 2?",
        "options": ["3", "4", "5", "6"],
        "answer": 1
    }
]
```

##### Submit Quiz Answers

`POST /api/quiz/submit` - Submit answers and get score

**Request Body:**

```json
{
    "answers": [
        {
            "quizId": "uuid-1",
            "answer": 2
        },
        {
            "quizId": "uuid-2",
            "answer": 1
        }
    ]
}
```

**Response:**

```json
{
    "score": 2,
    "correct_answers": [
        {
            "id": "uuid-1",
            "answer": 2
        },
        {
            "id": "uuid-2",
            "answer": 1
        }
    ]
}
```

## Database Schema

The application uses a simple Quiz model with the following structure:

-   `id` (String, UUID): Unique identifier
-   `question` (String): The quiz question
-   `options` (String[]): Array of multiple choice options
-   `answer` (Int): Index of the correct answer

## Project Structure

```
quiz-application/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── api/            # API service functions
│   │   └── types/          # TypeScript type definitions
│   └── package.json
├── server/                 # Backend Express.js application
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API route definitions
│   │   ├── service/        # Business logic services
│   │   ├── prisma/         # Database schema and migrations
│   │   └── types/          # TypeScript type definitions
│   ├── test/               # Unit tests
│   └── package.json
└── README.md
```

## Development Commands

### Client

```bash
pnpm run dev        # Start development server
pnpm run build      # Build for production
```

### Server

```bash
pnpm run dev        # Start development server with hot reload
pnpm run build      # Compile TypeScript
pnpm run start      # Start production server
pnpm run prisma:seed # Seed database with sample data
```

## Testing

### Test Structure

```
server/
├── test/
│   ├── getScore.test.ts      # Unit tests for scoring logic
│   └── __mocks__/
│       └── prisma.ts         # Prisma client mocks
└── vitest.config.ts          # Vitest configuration
```

### Running Tests

The backend includes unit tests for the scoring logic using Vitest.

```bash
# Navigate to server directory
cd server

# Run tests
pnpm test getScore

```

### What's Tested

-   **Scoring Logic**: Calculation of quiz scores based on user answers
-   **Edge Cases**: Empty answers, missing questions, invalid inputs
-   **Database Mocking**: Tests run without requiring actual database connection

## Design Choices and Assumptions

### Assumptions

-   Users can only select one answer per question (multiple choice)
-   Quiz questions are pre-seeded in the database
-   All questions have equal weight (1 point each)
-   Unanswered questions are treated as incorrect
-   Score is calculated as a simple count of correct answers

### Design Choices

-   **File Structure**: Separated concerns with dedicated folders for routes, services, and controllers
-   **Environment**: ES modules for modern JavaScript features
-   **Database**: PostgreSQL for reliable data storage with Prisma ORM
-   **Testing**: Vitest for modern, fast unit testing with ES modules support
-   **Deployment**: Heroku for easy deployment with automatic builds

## Deployment

### Live Application

-   **Frontend**: Deployed on Vercel - [Live Demo](https://quiz-application-night.vercel.app/)
-   **Backend API**: Deployed on Heroku
-   **Database**: Hosted on Supabase (PostgreSQL)

### Environment Variables

#### Backend (Heroku)

```bash
DATABASE_URL=your-supabase-database-url
DIRECT_URL=your-supabase-direct-url  # For Supabase connection pooling
```

#### Frontend (Vercel)

```bash
VITE_API_URL=https://your-heroku-app.herokuapp.com
```
