# shareA

A real-time text sharing app built with React, TypeScript, Vite, and Socket.IO.

Users open the same room URL and see text changes from other users in that room.

## Project Structure

- `client/` - React and Vite frontend
- `server/` - Express and Socket.IO server

## Requirements

- Node.js 18 or newer
- npm

## Local Development

Install dependencies:

```bash
cd client
npm install

cd ../server
npm install
```

Start the Socket.IO server in one terminal:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

Open `http://localhost:5173` in your browser.

The local client uses this environment variable in `client/.env`:

```env
VITE_SOCKET_URL=http://localhost:3000
```

## How It Works

- The client connects to the Socket.IO server.
- A room ID comes from the URL: `/room/:roomId`.
- Each client joins that room.
- Text updates are broadcast only to other clients in the same room.

## Production Deployment

The frontend and Socket.IO server must be deployed separately:

- Deploy `client/` to Vercel.
- Deploy `server/` to Render, Railway, Fly.io, or another host that supports a persistent Node.js process.

### Server Environment Variables

Set these on the server host:

```env
CLIENT_URL=https://your-app.vercel.app
```

The server uses the host-provided `PORT` automatically.

### Vercel Environment Variable

Set this in the Vercel project for the Production environment:

```env
VITE_SOCKET_URL=https://your-server.onrender.com
```

After changing `VITE_SOCKET_URL`, redeploy the Vercel project because Vite embeds it during the build.

The client includes `vercel.json` so direct navigation or refreshes on room URLs work correctly.

## Build and Validation

Build the frontend:

```bash
cd client
npm run build
```

Check the server syntax:

```bash
cd server
node --check server.js
```

## Troubleshooting

- If the browser reports CORS errors, make sure `CLIENT_URL` exactly matches the Vercel URL, including `https://`.
- If Socket.IO connects to `localhost` in production, set `VITE_SOCKET_URL` in Vercel and redeploy.
- Open the Render service URL directly. It should display `Socket server is running`.
- Check the browser console for `Socket connection failed` and the Render logs for connection messages.
