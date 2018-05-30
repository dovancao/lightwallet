# Cách chạy lightwallet

Chạy full node geth cho dev ở 1 terminal

```
 geth --dev --rpc --rpccorsdomain "*" --rpcaddr "0.0.0.0" --rpcport
"8545" --mine --unlock=0
```

Mở terminal thứ 2 chạy

```
node app.js
```

Mở trình duyệt và load 
```
http://localhost:5000
```
