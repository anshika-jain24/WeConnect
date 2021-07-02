// import React,{createContext, useState} from 'react';

// export const StateContext =createContext();

// export const StateProvider =(props)=>{

//     const [video, setVideo] = useState(false);

//     const toggleVideo = () =>{
//         console.log("clickkkkk");
//         setVideo(!video);
//     }
    
//     return(
//     <StateContext.Provider value={{video, toggleVideo}}>
//         {props.children}
//     </StateContext.Provider>
//     );
// };

// // export const useStateValue =()=>useContext(StateContext);