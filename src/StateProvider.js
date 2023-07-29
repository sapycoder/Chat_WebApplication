import React, { createContext, useContext, useReducer } from "react"

export const StateContext = createContext();

export const StateProvider = ({                     //TO SETUP DATA TOBE EXPORTED TO DATA LAYER
    reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext (StateContext);//TO PULL INFO FROM DATA