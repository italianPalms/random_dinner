import { ChangeEvent, useState } from 'react'
import './App.css'
import axios from 'axios';

interface Dinner {
  _id: string;
  dinnerName: string;
  timeCategory: string;
}

const API_BASE_URL = 'https://random-dinner-backend.vercel.app'
// const API_BASE_URL = 'http://localhost:3000'

const Dinner = () => {

  const [dinner, setDinner] = useState<Dinner>({
    _id:'',
    dinnerName: "", 
    timeCategory: "",
  });
  const [randomDinner, setRandomDinner] = useState<string>("");
  const [dinners, setDinners] = useState<Dinner[]>([]);
  const [fetchedDinner, setFetchedDinner] = useState<Dinner | null>(null);
  const [dinnerNameBorderColor, setDinnerNameBorderColor] = useState(false);
  const [selectTimeCategory, setSelectTimeCategory] = useState(false);

  const dinnerNameColor = dinnerNameBorderColor ? "border-red-500" : "";
  const timeCategoryColor = selectTimeCategory ? "border-red-500" : "";
  
  const addDinner = async () => {
    try {
      if (dinner.dinnerName.length === 0) {
        setDinnerNameBorderColor(true);
        console.log('Enter a dinner name')
        return;
      } else if (dinner.timeCategory.length === 0) {
        setSelectTimeCategory(true)
        console.log('Enter a time category')
        return;
      }
      const response = await axios.post(`${API_BASE_URL}/addDinner`, dinner);
      console.log('Dinner added successfully', response.data);
    } catch (err) {
      console.log('Add new dinner failed' + err);
    }
  }

    // Fetch a random dinner from the server
  const getRandomDinner = async () => {
    try {
      const selectedTimeCategory = randomDinner; // Get the selected time category

      const response = await axios.get(`${API_BASE_URL}/getDinner`, {
        params: {
          timeCategory: selectedTimeCategory
        },
      });
      console.log('Random dinner fetched:', response.data);

      setFetchedDinner(response.data);
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


  const fetchAllDinners = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAllDinners`);
      console.log('All dinners fetched', response.data)
      setDinners(response.data);
    } catch (err) {
      console.error('Failed to fetch all dinners', err);
    }
  };
  
  return (
    <>
      <h1>Random dinner selector</h1>
      <div className="card">
        <input className={`dinnerInput ${dinnerNameColor}`}
          id='dinnerName'
          type='text'
          value={dinner.dinnerName}
          onChange={(e) => {
            setDinnerNameBorderColor(e.target.value.trim() === '');
            setDinner({...dinner, dinnerName: e.target.value});
          }}
          placeholder='Enter dinner name'
          required>
        </input>
        <select className={`timeCategorySelector ${timeCategoryColor}`}
          value={dinner.timeCategory}
          onChange={handleAddDinner}>
          <option value="">Select a time category</option>
          <option value="Quick">Quick</option>
          <option value="Medium">Medium</option>
          <option value="Slow">Slow</option>
        </select>
        <button className='dinnerButton' onClick={addDinner}>
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
        <button className='dinnerButton' onClick={getRandomDinner}>
          Random dinner
        </button>
        </div>
        {fetchedDinner && (
          <div>
            <h2>Random dinner</h2>
            <p>Name: <strong>{fetchedDinner.dinnerName}</strong></p>
            <p>Time Category: <strong>{fetchedDinner.timeCategory}</strong></p>
          </div>
        )}
      <div className='card'>
        <button className='dinnerButton'
          onClick={fetchAllDinners}
        >See all dinners</button>
          {dinners.map((dinner) => (
            <li key={dinner._id}>
              <p>Name: {dinner.dinnerName}</p>
              <p>Time Category: {dinner.timeCategory}</p>
            </li>
          ))}
      </div>


      {/* //TODO - Deploy the app to vercel */}
      {/* //TODO Add selector for healthiness */}
      {/* //TODO - Add functionality to the user can get four random dinners (covering the whole week), and three of them needs to be healthy (needs to be connected to the healthieness attribute) - decide if this should be a new page, or just divide this page into three sections - one for adding, one for getting one random dinner from the timeCategory selected, and one section where you get random dinners for the whole week */}
    </>
  )
}

export default Dinner;