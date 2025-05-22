# GiftSnapUI

A modern, minimal dashboard UI built with React Native and Expo. Optimized for Snack compatibility.

## Features
- Clean dashboard layout: sidebar, top bar, stats cards, and table
- 100% dummy/mock data (no backend required)
- Single file design for easy Snack usage
- Mobile-responsive design with toggleable sidebar

## Stack
- React Native + Expo
- Ready for Snack.expo.dev

## Run in Snack

1. Go to [snack.expo.dev](https://snack.expo.dev)
2. Create a new project
3. Copy the contents of `App.js` into the Snack editor
4. Run on your device by scanning the QR code

### 2. Start the development server
```bash
npm run dev
```

### 3. Run tests
- Unit tests: `npm run test`
- E2E tests: `npx playwright test`

---

## Project Structure
```
GiftSnapUI/
├── src/
│   ├── components/    # Reusable UI components
│   ├── layouts/       # Layout components (Sidebar, Topbar, etc)
│   ├── data/          # Dummy/mock data
│   ├── App.tsx        # Main app entry
│   └── main.tsx       # Vite entry point
├── tests/             # Unit and E2E tests
├── README.md
├── requirements.txt   # All dependencies
└── ...
```

## License
MIT
