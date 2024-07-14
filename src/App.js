import logo from './logo.svg';
import './App.css';
import Todolist from './components/todolist';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
function App() {
  return (
    <div className="App">
      <Todolist />
    </div>
  );
};
export default App;
