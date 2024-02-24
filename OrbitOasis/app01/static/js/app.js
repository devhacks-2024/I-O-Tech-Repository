const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 8000;
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'zhihao',
    password: '1234',
    database: 'data'
});

// 确保数据库存在
db.query('CREATE DATABASE IF NOT EXISTS data', (err, result) => {
    if (err) throw err;
    console.log('Database created or already exists');

    // 使用数据库
    db.query('USE data', (err, result) => {
        if (err) throw err;

        // 创建表
        db.query(`
            CREATE TABLE IF NOT EXISTS user (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `, (err, result) => {
            if (err) throw err;
            console.log('Table created or already exists');
        });
    });
});

app.get('/user', (req, res) => {
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});