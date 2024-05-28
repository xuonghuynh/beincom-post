## About the Project

Hi Beincom Devs,

This application was developed as part of a technical assessment and showcases my proficiency with modern web development technologies and frameworks, particularly Next.js, React Query, TypeScript, Prisma, Shadcn, Tailwind, and NextAuth.

I read your requirements, which suggested using JSONPlaceholder to create fake data for interaction. Finding this relatively straightforward, I decided to take it a step further and develop a full-stack web application. Leveraging Prisma and PostgreSQL, I created a web app that allows users to create posts and save them to the database efficiently.

I look forward to the opportunity to join your team in the near future. Please feel free to install and test the application. If you encounter any issues, please contact me using the information provided in the [Contact Me](#contact-me) section below.

## Table of Contents

- [Installation](#installation)
- [Usage](#Usage)
- [Running Tests](#running-tests)
- [Contact](#contact)
- [Prerequisites](#Prerequisites)

## Live site

I deployed this project to my small server at home. You can visit the live site to test the application without installing it locally:

```bash
https://beincom.longxuong.com
```

## Installation

1. Clone the project
```bash
https://github.com/xuonghuynh/beincom-post.git
cd beincom-post
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

- Rename the .env.example file to .env.

```bash
mv .env.example .env
```

- Fill out the variables in the .env file:

```bash
NEXT_PUBLIC_APP_URL="http://localhost:3000"
DATABASE_URL="PostgreSQL URL. Example: postgres://user:password@url:5433/postgres. You can use https://neon.tech/ for free."
AUTH_SECRET="Auth secret. Generate by using: 'npx auth secret' on your terminal."
RESEND_API_KEY="Resend API key. https://resend.com/"
GITHUB_ID="GitHub ID"
GITHUB_SECRET="GitHub secret"
GOOGLE_ID="Google ID"
GOOGLE_SECRET="Google secret"
```

4. Generate and push Prisma models to the database:

```
npx prisma generate
npx prisma db push
```

## Usage

1. Start the development server: `npm run dev`
2. Open your browser and visit `http://localhost:3000` to view the website.

## Running Tests

```
npm run test:ui
```

## Contact Me

- Fakebook: https://www.facebook.com/longxuong92/
- Email: longxuongz@gmail.com

## Prerequisites

- Node.js v14 or higher
- npm v6 or higher
