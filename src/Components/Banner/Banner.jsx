import React from 'react';
import banner from '../../../assets/images/banner-copy.png'
import './Banner.css';

import Arrow from '../../assets/Arrow'
function Banner() {
  const categories = [
    "Cars", "Motorcycles", "Mobile Phones",
    "Houses & Apartments for Sale",
    "Scooters", "Commercial Vehicles",
    "Houses & Apartments for Rent"
  ];
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
            <Arrow />
          </div>
          <div className="otherQuickOptions">
            {categories.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        </div>
        <div className="banner">
          <img src={banner} alt="OLX Banner" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
