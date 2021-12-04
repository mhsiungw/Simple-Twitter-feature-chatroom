# Simple-Twitter CH組

## 前端 
[simple-twitter前端](https://github.com/CHLin13/twitter-front-end)

###專案建置
```
git clone https://github.com/CHLin13/twitter-front-end.git
```
```
npm ci
```
```
npm run serve
```

## 後端 

[simple-twitter 後端](https://github.com/CHLin13/twitter-api-2020)

###本地端專案建置

##本地端資料庫建置(MySQL Workbench)
```
create database ac_twitter_workspace;
create database ac_twitter_workspace_test;

```

##本地端資料圖遷徒檔與種子檔設置
```
npx sequelize db:migrate
npx sequelize db:migrate:undo:all

npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo:all

```

###後端Serve本地端運行

```
git clone https://github.com/CHLin13/twitter-api-2020.git
```
```
npm ci
```
```
npm run serve
```


###專案測試帳號
```
##前台測試帳號：
email: user1@example.com
password: 12345678
```
```
##後台測試帳號：
email: root@example.com
password: 12345678
```
