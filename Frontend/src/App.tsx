import { ChangeEvent, useState } from 'react'
import './App.css'
import axios from 'axios';

const Dinner = () => {

  const [dinner, setDinner] = useState({
    dinnerName: "", 
    timeCategory: "", 
  })

  // const [selectedOption, setSelectedOption] = useState('');

  const addDinner = async () => {
    try {
      if (dinner.dinnerName.length === 0) {
        console.log('Enter a dinner name')
        return; 
      } else if (dinner.timeCategory.length === 0) {
        console.log('Enter a time category')
        return;
      }
      const response = await axios.post('http://localhost:3000/addDinner', dinner);
      console.log('Dinner added successfully', response.data);
    } catch (err) {
      console.log('Add new dinner failed' + err);
    }
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDinner({...dinner, timeCategory: e.target.value});
  };
  
  return (
    <>
      <h1>Random dinner selector</h1>
      <div className="card">
        <input
          id='dinnerName'
          type='text'
          value={dinner.dinnerName}
          onChange={(e) => setDinner({...dinner, dinnerName: e.target.value})}
          placeholder='Enter dinner name'
          required>
        </input>
        <select value={dinner.timeCategory}
          onChange={handleSelectChange}>
          <option value="">Select an time category</option>
          <option value="Quick">Quick</option>
          <option value="Medium">Medium</option>
          <option value="Slow">Slow</option>
        </select>
        {/* <input
          id='timeCategory'
          type='text'
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          placeholder='Select an option'
          readOnly
          required>
        </input> */}
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
