import React from 'react'
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import "./featuredCategories.scss"

const categories = [
    {
        id: 1,
        name: 'Category 1',
        image: 'https://via.placeholder.com/300',
    },
    {
        id: 2,
        name: 'Category 2',
        image: 'https://via.placeholder.com/300',
    },
    {
        id: 3,
        name: 'Category 3',
        image: 'https://via.placeholder.com/300',
    },
    // Add more categories as needed
];


const FeaturedCategories = () => {
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
            <h2 className='featured-title'>Featured Categories</h2>
            <Slider {...settings}>
                {categories.map((category) => (
                    <div key={category.id} className="category-card">
                        <Link className='category-title-link' to={`/category/${category.id}`}>
                            <h3 className='category-title'>{category.name}</h3>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default FeaturedCategories