import { useContext } from 'react';
import NavigationContext from '../context/navigationContext';
const useNavigation = () => {
  return useContext(NavigationContext);
};

export default useNavigation;
