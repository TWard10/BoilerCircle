import React, { Component } from 'react'

export default ({inter, initText, addint, pickedList}) =>{
  

    const interList = inter
    .filter(inter => {
        return pickedList.indexOf(inter.id)===-1 && inter.inter.toLowerCase().indexOf(initText) >= 0
    })
    .map(inter => {
     
      return(
       <li key = {inter.id}> <button
       onClick={() => addint(inter.id)}>
       
    
       {inter.inter}
       </button>
       </li>
     )
    });

    return (
      
    <div>
        <ul>
        {interList}
      </ul>
     
</div>
      
      

    );
      
     }


