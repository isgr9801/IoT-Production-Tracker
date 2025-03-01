This is a [Next.js](https://nextjs.org) project to handle IoT based microcontrollers and to visualize data reports received

##Technology Used
	Typescript/react
	Tailwind CSS
		Firebase (For Authentication)
		Next-Theme (for theme)

## Getting Started
you first need firebase account have used email&password authentication so to run this project even on localhost internetis required else authentication won't work

```bash
	npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

##This project can be easily be deployed on Vercel
	just setup environment variables additionally obefore deployment

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


sample .env file
NEXT_PUBLIC_FIREBASE_API_KEY="apikey"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="wfirebase auth domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="project ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="Storage bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="messaging sender id"
NEXT_PUBLIC_FIREBASE_APP_ID= "app id"
