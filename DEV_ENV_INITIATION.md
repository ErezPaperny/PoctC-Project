# Development Enviroment Installation

### Git Repo creation:

* Create a new Reposetory for our project
* Clone it locally

### Client installation:

* Create next application from project root (project name client, all the rest answer Yes):

```shell
npx create-next-app@latest
```

* Install AntD as design components:

```shell
npm install antd
```

* Test that application is working:

```shell
npm run dev
```

* Add to main page AntD component to test that all is working:

```typescript
...
import { DatePicker } from 'antd';
...
            <DatePicker />
...
```

### Server installation:

* mkdir server
* cd server
* npm init -y
* npm install express
* npm install --save-dev typescript @types/node @types/express ts-node nodemon
* npx tsc --init
* Modify tsconfig.json with:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true
  }
}
```

* mkdir src
* create .\src\index.ts file with the following content:

```typescript
import express, { Request, Response } from "express";    const app = express();
const PORT = 5000;

app.get("/", (req: Request, res: Response) => {
res.send("Hello from the Express Server!");
});

app.listen(PORT, () => {
console.log(`Server is running at http://localhost:${PORT}`);
});
```

* adding the following line to project.json {scripts section}:

```json
"dev": "nodemon src/index.ts",
```

* start server by the following command:

```shell
npm run dev
```

### Connecting your client to server:

* In your server main index.ts code add the following section to eliminate Cros origin error:

```typescript
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
```

* In your client main page.tsx add the following sections:

```typescript
'use client'

import { useEffect, useState } from 'react';
... // In your Home function
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000')
      .then(res => res.text())
      .then(data => setMessage(JSON.parse(data).message))
      .catch(err => { console.log(err) });
  }, []);
... // In your component add somewhere to see server result
          {message}
...
```

* Run both server and see that you get server result on client page

### Imroving Development Scripts:

* From the project root folder install concurrently:

```shell
npm init
npm install --save-dev concurrently
```

* Add all relevant scripts to the client/package.json:

```json
"dev": "next dev --turbopack",
    "build": "npm install && next build",
    "start": "next start",
    "clean": "rmdir /s /q node_modules && del package-lock.json && rmdir /s /q .next && del next-env.d.ts",
```

* Add all relevant scripts to the server/package.json:

```json
"dev": "nodemon src/index.ts",
    "start": "nodemon src/index.ts",
    "build": "npm install",
    "clean": "rmdir /s /q node_modules && del package-lock.json",
```

* Add all relevant scripts to the package.json in the root directory:

```json
"start": "concurrently \"npm run start_client\" \"npm run start_server\"",
    "start_client": "cd client && npm run start",
    "start_server": "cd server && npm run start",
    "dev": "concurrently \"npm run dev_client\" \"npm run dev_server\"",
    "dev_client": "cd client && npm run dev",
    "dev_server": "cd server && npm run dev",
    "clean": "concurrently \"npm run clean_client\" \"npm run clean_server\" \"npm run clean_root\"" ,
    "clean_root": "rmdir /s /q node_modules && del package-lock.json",
    "clean_client": "cd client && npm run clean",
    "clean_server": "cd server && npm run clean",
    "build": "concurrently \"npm run build_client\" \"npm run build_server\" \"npm run build_root\"",
    "build_root": "npm install",
    "build_client": "cd client && npm run build",
    "build_server": "cd server && npm run build"
```

Now from the root directory you can run all commands and both environment (Client / Server) will be managed:

```shell
npm run clean
npm run build
npm run dev
npm run start
```

---

**CONGRATULATION you are DONE to setup your development enviroment.
You can now start DEVELOPMENT**
