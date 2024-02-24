const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 8000;

// 创建数据库连接池
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'zhihao',
    password: '1234',
    database: 'data'
});

// 使用express.json()中间件来解析JSON格式的请求体
app.use(express.json());

// 确保数据库和表存在的代码保持不变

app.get('/', (req, res) => {
    db.query('SELECT * FROM user', (err, data) => {
        if (err) return res.status(500).send(err.message);
        if (data.length === 0) return res.status(404).send('数据为空');
        res.send({
            status: 0,
            msg: '数据获取成功',
            data
        });
    });
});

// 添加一个新的POST路由来接收用户数据并添加到数据库
app.post('/signup', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    db.query('INSERT INTO user (username, password) VALUES (?, ?)', [username, password], (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(201).send({ status: 0, msg: '用户添加成功' });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
