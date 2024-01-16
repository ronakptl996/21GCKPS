import { createContext, useContext, useState } from "react";

const DropdownContext = createContext();

export const useDropdownContext = () => {
  return useContext(DropdownContext);
};

export const DropdownProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <DropdownContext.Provider value={{ isOpen, toggleDropdown, closeDropdown }}>
      {children}
    </DropdownContext.Provider>
  );
};
