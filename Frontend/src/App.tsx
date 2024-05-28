import { ChangeEvent, useState } from 'react'
import './App.css'
import axios from 'axios';

const Dinner = () => {

  const [dinner, setDinner] = useState({
    dinnerName: "", 
    timeCategory: "",
  })

  const [randomDinner, setRandomDinner] = useState("");

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

  // Fetch a random dinner from the server
  const getRandomDinner = async () => {
    try {
      const selectedTimeCategory = randomDinner; // Get the selected time category

      const response = await axios.get('http://localhost:3000/getDinner', {
        params: {
          timeCategory: selectedTimeCategory
        },
      });
      console.log('Random dinner fetched:', response.data);

      // Update the dinner state with the fetched dinner
      setDinner({
        dinnerName: response.data.dinnerName, 
        timeCategory: response.data.timeCategory
      });
    } catch (err) {
      console.error('Error fetching random dinner:', err);
    }
  };

  const handleAddDinner = (e: ChangeEvent<HTMLSelectElement>) => {
    setDinner({...dinner, timeCategory: e.target.value});
  };

  const handleRandomDinner = (e: ChangeEvent<HTMLSelectElement>) => {
    setRandomDinner(e.target.value);
  };
  
  return (
    <>
      <h1>Random dinner selector</h1>
      <div className="card">
        <input className='dinnerInput'
          id='dinnerName'
          type='text'
          value={dinner.dinnerName}
          onChange={(e) => setDinner({...dinner, dinnerName: e.target.value})}
          placeholder='Enter dinner name'
          required>
        </input>
        <select className='timeCategorySelector' value={dinner.timeCategory}
          onChange={handleAddDinner}>
          <option value="">Select a time category</option>
          <option value="Quick">Quick</option>
          <option value="Medium">Medium</option>
          <option value="Slow">Slow</option>
        </select>
        <button onClick={addDinner}>
          Add dinner
        </button>
      </div>
      <div>
        <select className='timeCategorySelector' value={randomDinner}
          onChange={handleRandomDinner}>
            <option value="">Select a time category</option>
            <option value="Quick">Quick</option>
            <option value="Medium">Medium</option>
            <option value="Slow">Slow</option>
          </select>
        <button onClick={getRandomDinner}>
          Random dinner
        </button>
      </div>

      
      {/* //TODO - Deploy the app to vercel */}
      {/* //TODO Add selector for healthiness */}
      {/* //TODO - Add functionality to the user can get four random dinners (covering the whole week), and three of them needs to be healthy (needs to be connected to the healthieness attribute) - decide if this should be a new page, or just divide this page into three sections - one for adding, one for getting one random dinner from the timeCategory selected, and one section where you get random dinners for the whole week */}
    </>
  )
}

export default Dinner;