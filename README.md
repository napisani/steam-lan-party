# Steam Game Coordinator

A Next.js web application that helps groups of friends coordinate which Steam games they can play together. The app allows users to:

- Search for Steam users by username or ID
- View which games each user owns
- Identify games that are shared between all users
- See pricing information for missing games

This tool is particularly useful for:
- Planning game nights with friends
- Finding multiplayer games everyone owns
- Coordinating game purchases
- Discovering which friends are missing specific games

## Getting Started

1. Create a `.env` file containing a Steam Web API key

```bash

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser
3. Start searching for Steam users to compare game libraries

## Disclaimer

⚠️ This project was quickly hacked together as a proof of concept and is not actively maintained. It may contain bugs, security issues, or break with Steam API changes. Use at your own risk.

## Technical Details

Built with:
- [Next.js](https://nextjs.org)
- React Query for data fetching
- Material UI components
- Steam Web API integration

## Contributing

While this project isn't actively maintained, feel free to fork it and make your own improvements!
