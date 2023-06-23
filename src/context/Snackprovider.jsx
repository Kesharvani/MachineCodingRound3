import { createContext, useContext, useEffect, useReducer } from "react";

import { snacks } from "../db/snack";
import { initialValue, snackReducer } from "../reducer/snackReducer";
export const SnackContext = createContext();
export const SnackProvider = ({ children }) => {
  const [state, dispatch] = useReducer(snackReducer, initialValue);

  const getData = () => {
    dispatch({ type: "SUCCESS", payload: snacks });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <SnackContext.Provider value={{ state, dispatch }}>
      {children}
    </SnackContext.Provider>
  );
};

export const useSnack = () => useContext(SnackContext);
