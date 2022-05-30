import { BarLoader} 
from 'react-spinner-animated';

const Loader = () => {
  return < BarLoader text={"Loading..."}  
    center={false} width={"150px"} height={"150px"}/>
};

export default Loader;