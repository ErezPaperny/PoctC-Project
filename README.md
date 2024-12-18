# PostC-Project

Amit Laderech Post C - Project (By Erez Paperny)

## Project Description

In this project we will build inventory manamgnet system that will include the following components:

* Users - Table of users. User can be Admin or User with un-encrypted passworkds
* Products - Admin can add / remove / update products
* Product Inventory - Admin can add / update inventory numbers
* User Dashboard - Can see list of product that exists in inventory and add them to Cart
* Cart - User can add / remove products from cart. User check out cart and its will create Order.
* Admin Dashboard - Can see orders and approve them (Once approve product inventory reduced) as well can see product list and status of invotory of them.

## Development Enviroment Installation

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

**CONGRATULATION you are DONE to setup your development enviroment.
You can you start DEVELOPMENT**

