import React from 'react'
import Slider from 'react-slick';

import './featuredSlider.scss'

const products = [
    {
        id: 1,
        name: 'Product 1',
        image: 'https://via.placeholder.com/300',
        price: '$100',
    },
    {
        id: 2,
        name: 'Product 2',
        image: 'https://via.placeholder.com/300',
        price: '$200',
    },
    {
        id: 3,
        name: 'Product 3',
        image: 'https://via.placeholder.com/300',
        price: '$300',
    },
    // Add more products as needed
];

const FeaturedSlider = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="slider-container">
            <h2 className='featured-title'>Featured Products</h2>
            <Slider {...settings}>
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img className='product-img' src={product.image} alt={product.name} />
                        <h3 className='product-title'>{product.name}</h3>
                        <p className='product-price'>{product.price}</p>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default FeaturedSlider