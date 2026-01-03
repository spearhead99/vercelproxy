# BTCC API Proxy (Vercel Serverless)

A serverless proxy for the BTCC API, deployed on Vercel.

## Deployment

### Method 1: GitHub + Vercel Dashboard
1. Push these files to a GitHub repository
2. Go to https://vercel.com
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

### Method 2: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

## Endpoints

- `GET /api/health` - Health check
- `GET /` - API information
- `ALL /api/proxy/*` - Proxy to BTCC API

## Example Usage

```bash
curl https://your-vercel-app.vercel.app/api/health
```

## Environment

No environment variables needed! CORS origins are configured in `vercel.json`.
