import React from 'react'
import { Chip, Avatar } from 'material-ui';

export default ({picked, intList, removeint}) => {
   
    const idList = picked
    
    
    .map( (id) => {

        const interest = intList[id].inter
        //console.log('id for name', id)


    
          return(
             <li key={id}>

             <Chip

                onDelete={() => removeint(intList[id])}
                label =  {interest} >
                
             </Chip>

             </li>
          )
        }
    )
    return(
            <div>
                <ul>
                    {idList}
                    </ul>
            </div>
    )
}