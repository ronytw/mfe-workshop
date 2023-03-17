### mfe-communication-solution

## To run catalog mfe

```
cd catalog
npm install
npm start
```

This will start the webpack dev server at `http://localhost:8081` port.

## To run cart mfe

```
cd cart
npm install
npm start
```

This will start the webpack dev server at `http://localhost:8082` port.

## To run container app

```
cd container
npm install
npm start
```

This will install the catalog and cart mfes as npm dependencies and start the webpack dev server at `http://localhost:8080`.

## Known Issues

```
ERROR in ./src/index.js 4:0-38
Module not found: Error: Can't resolve 'ui-components' in '/<HOME>/mfe-workshop/05-mfe-communication-solution/cart/src'
```

### Solution
- Run  `npm i git@github.com:Vishalsh/ui-components.git` **(OR)**
- Use Node `v12.22.12`
