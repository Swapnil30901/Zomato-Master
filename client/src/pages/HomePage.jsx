import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';


//redux actions
import { getRestaurant } from '../redux/reducers/restaurant/restaurant.action';

//Components
import Delivery from '../component/Delivery'
import Dining from '../component/Dining'
import NightLife from '../component/NightLife'
import Nutrition from '../component/Nutrition'

function Homepage() {

  const {type} = useParams();
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getRestaurant());
  } );

    return (
    <div className='my-5'>
      {type=== 'delivery' && <Delivery/>}
      {type=== 'dining' && <Dining/>}
      {type=== 'night' && <NightLife/>}
      {type=== 'nutri' && <Nutrition/>}
    </div>
  )
}

export default Homepage;
