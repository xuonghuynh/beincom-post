# About the Project

Hi Beincom Devs,

This application was developed as part of a technical assessment and showcases my proficiency with modern web development technologies and frameworks, particularly Next.js, React, TypeScript, Prisma, Shadcn, Tailwind, and NextAuth.

I read your requirements, which suggested using JSONPlaceholder to create fake data for interaction. Finding this relatively straightforward, I decided to take it a step further and develop a full-stack web application. Leveraging Prisma and PostgreSQL, I created a web app that allows users to create posts and save them to the database efficiently.

I look forward to the opportunity to join your team in the near future. Please feel free to install and test the application. If you encounter any issues, please contact me using the information provided in the contact section below.

## Table of Contents

- [Installation](#installation)
- [Usage](#Usage)
- [Running Tests](#running-tests)
- [Contact](#contact)
- [Prerequisites](#Prerequisites)

# Live site

I deployed this project to my small server at home. So, you can go to this site and test without install it to your local.

```bash
https://beincom.longxuong.com
```

## Installation

1. Clone the project
```bash
https://github.com/xuonghuynh/beincom-post.git
```

Then:

```
npm install
```

2. You need to setup few enviroment variables to make this work. Find the .evn.example -> rename it to .env -> fill out variables. Or create a .env file in the root directory. You need to add these variables:

```
NEXT_PUBLIC_APP_URL="http://localhost:3000"
DATABASE_URL="PostgreSQL URL. Example: postgres://user:password@url:5433/postgres. You can use https://neon.tech/ for free."
AUTH_SECRET="Auth secret"
RESEND_API_KEY="Resend API key. https://resend.com/"
GITHUB_ID="GitHub ID"
GITHUB_SECRET="GitHub secret"
GOOGLE_ID="Google ID"
GOOGLE_SECRET="Google secret"
```

3. Generate and Push model to database

```
npx prisma generate
```
Then
```
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

Fakebook: https://www.facebook.com/longxuong92/
Email: longxuongz@gmail.com

### Prerequisites

- Node.js v14 or higher
- npm v6 or higher
