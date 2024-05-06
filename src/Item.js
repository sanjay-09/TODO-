import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { IoIosCheckboxOutline } from "react-icons/io";
import axios from "axios";
import { useState } from "react";
import { useDeleteTasksMutation, useUpdateTasksMutation } from "./RTK/apiSlice";

const Item=({data})=>{

    const {id,value,completed}=data;
   const [updateItem]=useUpdateTasksMutation();
   const [deleteItem]=useDeleteTasksMutation();
   
    const update=()=>{
        const payload={
            id:id,
            data:{
                value:value,
                completed:true
            }
        }
        updateItem(payload);
    }
    const del=()=>{
        deleteItem(id);
        
    }
    return(
        <div className='flex justify-between mt-2 px-6 items-center'>
        <div>
       {completed===false?<MdCheckBoxOutlineBlank className='text-3xl cursor-pointer'  onClick={update}/> : <IoIosCheckboxOutline className='text-3xl cursor-pointer'/> } 
         
         </div>

         <div>
          <p className='text-xl font-bold capitalize'>{value}</p>
         </div>

         <div className=''>
         <MdDeleteSweep className='text-3xl cursor-pointer' onClick={del}  />

         </div>
      
       </div>
    )
}
export default Item;