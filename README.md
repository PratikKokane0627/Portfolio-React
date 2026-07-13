# Pratik Kokane Portfolio

React and Vite portfolio website for Pratik Kokane.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The production files are generated in `dist/`.

## GitHub Pages Deployment

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

After pushing to the `main` branch, enable GitHub Pages in the repository settings:

1. Open repository `Settings`.
2. Go to `Pages`.
3. Set `Build and deployment` source to `GitHub Actions`.

Future pushes to `main` will build and deploy the site automatically.
