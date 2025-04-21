# Mothrbox Frontend

> A secure, developer-friendly storage layer for Web3 and hybrid apps. Built with Next.js.

Mothrbox enables client-side encryption using ECC, fast API access, and seamless data storage—encrypted or plain. Perfect for confidential content, token-gated files, and AI models. This frontend connects developers to the power of privacy-first storage, without the headache of managing encryption.

## 🚀 Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [bootstrap](https://getbootstrap.com/)
- [Mothrbox API](https://github.com/georgegoldman/mothrbox)


## 🧠 Features

- 🔐 Client-side ECC encryption
- ⚡ Fast API integration
- 🧩 Token-gated access
- 📁 Plain or Encrypted storage
- 🤖 Support for encrypted AI model hosting

## 🛠️ Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/georgegoldman/mothrbox-frontend.git

# 2. Navigate into the project
cd mothrbox-frontend

# 3. Install dependencies
npm install
# or
yarn install

# 4. Run the development server
npm run dev
# or
yarn dev

# App will be running at http://localhost:3000
```

## 🔧 Environment Variables
Create a .env.local file in the root directory and add your variables:

```bash
NEXT_PUBLIC_MOTHRBOX_API_URL=https://api.mothrbox.xyz
```
> Make sure not to commit sensitive keys!

## 📂 Project Structure

```bash
.
├── app 
│   ├── contexts # Auth and states
├── components # Reusable UI components
├── hooks # Custom hooks
└── lib # API/utility helpers
```


Made with ❤️ by the Mothrbox Team

