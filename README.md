# Demo 網址

[Simple-Twitter-Demo](https://mhsiungw.github.io/Simple-Twitter-feature-chatroom)

<br />

使用者可以使用以下帳號分別登入系統前台和後台：

前台測試帳號：

```
email: user1@example.com
password: 12345678
```

後台測試帳號：

```
email: root@example.com
password: 12345678
```


<br />

# 本地端專案建置
## 前端

<br />

```
git clone https://github.com/CHLin13/twitter-front-end.git
```
```
cd twitter-front-end
```
```
npm ci
```
```
npm run serve
```

<br />

## 後端

### [API Base URL](https://thawing-taiga-98720.herokuapp.com/api)
### [後端 GitHub repo](https://github.com/CHLin13/twitter-api-2020)

<br />



1. 請在終端機輸入

```
git clone https://github.com/CHLin13/twitter-api-2020.git
cd twitter-api-2020
npm install
```

2. 建立.env

```
PORT=3000
JWT_SECRET=alphacamp
SESSION_SECRET=SECRET
IMGUR_CLIENT_ID=YOUR ID
```

3. 使用 MySQL Workbench 建立資料庫

```
create database ac_twitter_workspace;
```

4. 在終端機輸入以下指令，進行資料庫遷移、種子資料初始化

```
npx sequelize db:migrate
npx sequelize db:seed:all
```

5. 在終端機輸入以下指令，啟動後端專案
### 在OS環境上
```
npm run dev
```
### 在Window環境上
```
nodemon app.js
```
# 開發人員

> 後端

- [Lin CH](https://github.com/CHLin13)
- [Will](https://github.com/Will413028)

> 前端

- [minhsiung](https://github.com/mhsiungw)
- [DanLin](https://github.com/iita71737)