import useNavigation from '../hooks/useNavigation'
const Route = ({path,children}) =>{
    const {currentPath} = useNavigation()
    return currentPath === path ?  children : null;
}

export default Route