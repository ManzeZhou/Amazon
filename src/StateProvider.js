
import React, {createContext, useContext, useReducer} from "react";

//prepare the dataLayer
export const StateContext = createContext();

//wrap app and provide dataLayer
export const StateProvider = ({reducer, initialState, children}) => {
    return (
            <StateContext.Provider value={useReducer(reducer, initialState)}>
                {children}
            </StateContext.Provider>
        )}
;

// export const StateProvider = ({reducer, initialState, children}) => (
//     <StateContext.Provider value={useReducer(reducer, initialState)}>
//         {children}
//     </StateContext.Provider>
// );

//pull information from the dataLayer
export const useStateValue = () => {
    useContext(StateContext)
}