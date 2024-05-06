import logo from './logo.svg';
import './App.css';
import axios from "axios"
import Item from './Item';
import { useEffect,useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { useAddTasksMutation, useGetTasksQuery } from './RTK/apiSlice';




function App() {

   const {data:items}=useGetTasksQuery();
   const [addItems]=useAddTasksMutation();
 
   console.log("items",items);
  const [newValue,setValue]=useState("");

  const add=async()=>{
    const data={
      value:newValue,
      completed:false
    }
    addItems(data);
    setValue("");


  }

  

 
 
  return (
    <div >
      <div className=' w-[100%] sm:w-5/12 mx-auto  mt-6 border border-black-600 items-center'>
           <h1 className='text-center font-bold text-2xl mb-2' >Tasks</h1>
           <div className='flex justify-around sm:p-2 mb-2'>
           <input type="text" name="" id="" placeholder='add a new task'  className='border border-black-600 text-center w-[300px] rounded-md' value={newValue} onChange={(e)=>{
            setValue(e.target.value);
           }}/>
           <IoIosAddCircle className='text-2xl cursor-pointer ml-2' onClick={add}  />


           </div>
            <div className='h-[500px] overflow-y-auto'>
            {
             items  && items.map((item)=>{
                return <Item data={item}/>
              })
            }
            </div>

      </div>
    
    </div>

   
  );
}

export default App;
