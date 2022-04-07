## Setup
```
  npm i axios cookie-parser cors express jsonwebtoken mongodb uuid


  npm i typescript ts-node ts-node-dev @types/node @types/cookie-parser @types/cors @types/express @types/jsonwebtoken @types/uuid tsconfig-paths -D
  
```

tsconfig-paths use the config and types in sub-folders like /share





## client Setup
```
  yarn create next-app --typescript
```

Modify the tsconfig.json to share the types defined in /share
```
    "references": [{"path": "../shared"}]
```

Modify next.config to access the ../share folder in client project
```
    externalDir: true
```