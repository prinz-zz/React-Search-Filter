import express from "express";
const app = express();
import cors from "cors";
import { Users } from './users.js';

app.use(cors());

app.get('/', (req, res) => {
    //Method 1 Using API
    //res.json(Users.splice(0, 10));

    //Method 2 Using API 
    const { q } = req.query;
    const keys = ['first_name', 'last_name', 'email', 'gender'];
    const search = (data) => {
        return data.filter((item) => keys.some((key)=> item[key].toLowerCase().includes(q)));
      }
    
    res.json(search(Users).splice(0, 10));
});

app.listen(5000, ()=> console.log("Api listening on port 500"))