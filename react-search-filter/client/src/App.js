
import './App.css';
import { Users } from './users';
import { useState, useEffect } from 'react';
import Table from './Table';
import axios from 'axios';


export default function App() {

  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const keys = ['first_name', 'last_name', 'email', 'gender'];

  useEffect(() => {
    const fetchUsers = async () => {
      //method 1 using API// const res = await axios.get('http://localhost:5000/');
      //method 2 using API// 
      const res = await axios.get(`http://localhost:5000?q=${query}`);
      setData(res.data);
      console.log(Array.isArray(data));
      console.log(res.data);
    }
    //no limit 
    //fetchUsers();

    //Enable the search after 3 letters
    if( query.length === 0 || query.length > 2 ) fetchUsers();
  },[query]);

  console.log(Users[0]['email']);

  const search = (data) => {
    //method 1 Client side
    // return data.filter((item) => item.first_name.toLowerCase().includes(query) ||
    //   item.last_name.toLowerCase().includes(query) ||
    //   item.email.toLowerCase().includes(query) ||
    //   item.gender.toLowerCase().includes(query));
    
    //Method 2 Client side
    return data.filter((item) => keys.some((key)=> item[key].toLowerCase().includes(query)));
  }


  return (
    <div className="app">
      <input type="text" placeholder="Search" className="search" onChange={(e) => setQuery(e.target.value)} />
      
      {/* Client side method 
      <Table data={search(Users)} /> */}
      <Table data={data}/>
    </div>
  );
};


