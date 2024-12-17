# PostC-Project

Amit Laderech Post C - Project






Server installation:
    * mkdir server
    * cd server
    * npm init -y
    * npm install express
    * npm install --save-dev typescript @types/node @types/express ts-node nodemon
    * npx tsc --init
    * Modify tsconfig.json with: 
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
    * mkdir src
    * create .\src\index.ts file with the following content:
        import express, { Request, Response } from "express";

        const app = express();
        const PORT = 5000;

        app.get("/", (req: Request, res: Response) => {
        res.send("Hello from the Express Server!");
        });

        app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
        });
    * adding the following line to project.json {scripts section}:
        "dev": "nodemon src/index.ts",
    * start server by the following command:
        npm run dev
