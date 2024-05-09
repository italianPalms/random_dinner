import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

const Dinner = () => {

  const [dinnerName, setDinnerName] = useState({
    dinnerName: "", 
    timeCategory: "", 
  })

  const addDinner = async () => {
    try {
      if (dinnerName.dinnerName.length === 0) {
        console.log('Enter a dinner name')
        return; 
      } else if (dinnerName.timeCategory.length === 0) {
        console.log('Enter a time category')
        return;
      }
      const response = await axios.post('http://localhost:4000/addDinner', dinnerName)
      console.log('Dinner added successfully', response.data);
    } catch (err) {
      console.log('Add new dinner failed' + err);
    }
  }
  
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Welcome to random recipe</h1>
      <div className="card">
        <input
          id='dinnerName'
          type='string'
          value={dinnerName.dinnerName}
          onChange={(e) => setDinnerName({...dinnerName, dinnerName: e.target.value})}
          placeholder='Enter dinner name'
          required>
        </input>
        <input
          id='timeCategory'
          type='string'
          value={dinnerName.timeCategory}
          onChange={(e) => setDinnerName({...dinnerName, timeCategory: e.target.value})}
          placeholder='Enter time category'
          required>
        </input>
        <button onClick={addDinner}>
          Add dinner
        </button>
      </div>
      <div>
        <button onClick={() => console.log('random dinner button clicked')}>
          Random dinner
        </button>
      </div>
    </>
  )
}

export default Dinner
