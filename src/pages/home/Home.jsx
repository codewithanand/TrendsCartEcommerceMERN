import React, { useState } from 'react'
import './home.scss'
import Alert from '../../components/alert/Alert'
import FeaturedSlider from '../../components/featuredSlider/FeaturedSlider';

const Home = () => {
  const [alertVisible, setAlertVisible] = useState(false);

  const showAlert = () => {
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  return (
    <div className='home'>
      <button onClick={showAlert}>Show Alert</button>
      <Alert
        message="This is a floating alert!"
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        type="success"
      />
      <FeaturedSlider />
    </div>
  )
}

export default Home