import { createContext, useContext } from "react";
import fakeData from "../../data.json";

const DataContext = createContext(null);

export const DataProvider = ({ children, data = fakeData }) => {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export function useData() {
  return useContext(DataContext);
}
