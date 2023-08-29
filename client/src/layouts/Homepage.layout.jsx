
import Navbar from "../component/Navbar"
import FoodTab from '../component/FoodTab';

function HomeLayout({ children }) {
  return (
    <div>
      <Navbar />
      <FoodTab />
      <div className='container mx-auto px-4 lg:px-20'>{children}</div>
      
    </div>
  );
}

export default HomeLayout;