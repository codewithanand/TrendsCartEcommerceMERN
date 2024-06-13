import './home.scss'
import FeaturedProducts from '../../components/featuredProducts/FeaturedProducts';
import FeaturedCategories from '../../components/featuredCategories/FeaturedCategories';

const Home = () => {
  return (
    <div className='home'>
      <FeaturedCategories />
      <FeaturedProducts />
    </div>
  )
}

export default Home