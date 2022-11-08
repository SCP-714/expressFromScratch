const express = require('express');
const app = express();
const port = 3000;
const { Pool } = require('pg');

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'apples_oranges',
    password: 'docker',
    port: 5432,
});


app.get('/', (req, res) => {
    res.send('HelloWorld!')
});


app.get('/api/apples', (req, res) => {
    async function allApples() {
        try {
            let querystring = `SELECT * FROM apples`;
            const result = await pool.query(querystring);
            console.log(result);
            res.send(result.rows);
        } catch (e) {
            console.log(e.stack)
        }
    } 
  allApples()
});


app.get('/api/apples/:id', (req, res) => {
    async function getApples() {
        try {
            let querystring = 'SELECT * FROM apples WHERE id = $1';
            const result = await pool.query(querystring,[req.params.id]);
            console.log(result);
            res.send(result.rows);
        } catch (e) {
            console.log(e.stack)
        }
    }
    getApples()
});


app.post('/api/apples', (req, res) => {
    async function createApples() {
        try {
            let apples = req.body;
            let type = apples.type;
            let tree = apples.tree;
            console.log(type,tree);
            let querystring = `INSERT INTO apples (type,tree) VALUES ($1,$2)`;
            const result = await pool.query(querystring,[type,tree]);
            console.log(result);
            res.send(result.rows);
        } catch (e) {
            console.log(e.stack)
        }
    }
    createApples()
});


app.patch('/api/apples/:id', (req, res) => {
    async function patchApples() {
        try {
            let id = req.params.id;
            let apples = req.body;
            let type = apples.type;
            let tree = apples.tree;
            let querystring = 'UPDATE apples SET type = $1, tree = $2 WHERE id =$3';
            let value = [type,tree,id];
            const result = await pool.query(querystring,value);
            console.log(result);
            res.send(result.rows);
        } catch (e) {
            console.log(e.stack)
        }
    }
    patchApples()
});


app.delete('/api/apples/:id', (req, res) => {
    async function deleteApples() {
        try {
            let id = req.params.id;
            let apples = req.body;
            let type = apples.type;
            let tree = apples.tree;
            let querystring = 'DELETE FROM apples WHERE id =$1';
            let value = [id];
            const result = await pool.query(querystring,value);
            console.log(result);
            res.send(result.rows);
        } catch (e) {
            console.log(e.stack)
        }
    }
    deleteApples()
});


app.get('/api/oranges/:id', (req, res) => {
    async function getOranges() {
        try {
            let querystring = `SELECT * FROM oranges WHERE id =$1`;
            const result = await pool.query(querystring, [req.params.id]);
            console.log(result);
            res.send(result.rows);
        } catch (e) {
            console.log(e.stack)
        }
    }
    getOranges()
});


// app.patch('/api/oranges/:id', (req, res) => {
//     async function patchOranges() {
//         
//         try {
//             
//         } catch(e) {
//             console.log(e.stack)
//         }
//     }
//     patchOranges()
// });


// app.delete('/api/oranges/:id', (req, res) => {
//     async function deleteOranges() {
//         
//         try {
//             
//         } catch(e) {
//             console.log(e.stack)
//         }
//     }
//     deleteOranges()
// });


app.listen(port, () => {
    console.log(`Example app on port ${port}`)
}) 