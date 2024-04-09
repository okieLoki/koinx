## Koinx backend assignment

Deployed url: https://koinx-production.up.railway.app

### How to use locally?

- Clone the repository

  ```
  git clone https://github.com/okieLoki/koinx
  ```

- Install the packages using the package manager of your choice (eg: npm, pnpm, yarn)>

  ```
  <package_manager> install
  ```

- The env file is already included in the repository along with the env variables `API_URL` and `DATABASE_URL`. The MongoDB instance has been deployed on Atlas. Incase you wish to use mongodb locally you many comment out the first `DATABASE_URL` and uncomment the second one (which is the local URL).

- To run the application use the command
  ```
  npm run dev
  ```
  or replace npm with the package manager you are using. The server will start at `localhost:3000` by default if no PORT is specified in the env file.


### Folder Structure:
```
└── 📁src
    └── app.ts 
    └── config.ts 
    └── 📁controllers
        └── coinController.ts
    └── 📁cron
        └── updateCurrencyCron.ts
    └── 📁database
        └── dbConnect.ts
    └── 📁lib
        └── coinCronService.ts
    └── 📁middleware
        └── errorHandler.ts
    └── 📁models
        └── coinModel.ts
    └── 📁routes
        └── coinRoute.ts
```

### Tasks: 


- A Cron job has been set up to fetch the data from the Gecko API at a 1-hour interval. The cron job function can be found at `src/lib/coinCronService.ts` and is called in `app.ts` from `src/cron/updateCurrencyCron.ts`.

- To convert currencies, use the following endpoint: `https://koinx-production.up.railway.app/coin/conversion?fromCurrency={coin1}&toCurrency={coin2}&date={date}`.

    Example usage: 
    ![Task 2](https://res.cloudinary.com/ds90zherj/image/upload/v1712671109/mbl5c3tf9o5fkxkjltpy.png "Example usage")

    

- For company information about a specific coin, use the following endpoint: `https://koinx-production.up.railway.app/coin/company/{coinname}`.

    Example usage: 
    ![Task 3](https://res.cloudinary.com/ds90zherj/image/upload/v1712671304/fhsibubnrihezecwd5hu.png "Example usage")


> Replace https://koinx-production.up.railway.app with http://localhost:3000 for local testing

