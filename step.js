/* eslint-disable prettier/prettier */
/* 


-------------------------------------------------------------------------
                          initialise the project
-------------------------------------------------------------------------
 01) npm init -y 
 
 
-------------------------------------------------------------------------
                          install all dependency
-------------------------------------------------------------------------
 02) npm install bcrypt cookie-parser cors dotenv express http-status jsonwebtoken mongoose zod
 
 
-------------------------------------------------------------------------
                          typescript configuration
-------------------------------------------------------------------------
 03) npm install typescript --save-dev
 04) tsc -init
      "rootDir": "./src",
      "outDir": "./dist",   
      create folder name -> src
      in "script" file from TS to JS -> "build": "tsc",
          for auto build -> tsc -w  (each change dynamically no need to build)
      for .env file import configuration
          src > app > config > index.ts
          inside the file set current directory+.env
 
 
-------------------------------------------------------------------------
                          install dev dependency
-------------------------------------------------------------------------
 05) npm i --save-dev @types/express
     npm i --save-dev @types/cors
 09) npm i ts-node-dev --save-dev    
 10) npm install --save-dev @types/bcrypt @types/cookie-parser @types/jsonwebtoken
    
 
-------------------------------------------------------------------------
                         eslint and prettier setup
-------------------------------------------------------------------------
 06) add this two line in tsconfig.json
         "include": ["src"], // which files to compile
         "exclude": ["node_modules"], // which files to skip
     npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
         npx eslint --init
             after this in "eslint.config.mjs" this file
                 add some rules, languageOptions, prettierRecommended and other needed
 07) npm install --save-dev prettier
 08) npm install --save-dev eslint-config-prettier
 
 
-------------------------------------------------------------------------
                          vercel deploy
-------------------------------------------------------------------------
 -> vercel.json


-------------------------------------------------------------------------
                          my documentation
-------------------------------------------------------------------------

100) errors -> AppError.ts
100) errors -> HandleZodError.ts
100) interface -> error.ts (define error type)
100) interface -> index.d.ts (for add extra req header to send user data)
100) middlewares -> globalErrorhandler
100) middlewares -> notFound.ts
100) utils -> validateRequest.ts file for data validation with zod
100) utils -> catchAsync.ts file for controller try-catch
100) utils -> sendResponse.ts (custome) file for controller
100) after hashing the password, create token 
100) authGuard.ts to verefy the user validation 
-> in authGuard set -> req.user = decoded as JwtPayload;
100) server.ts -> unhandledRejection, uncaughtException




-> need cookies - Token
-> need queryBuilder
*/
