import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get('/restaurants')
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error('Error when getting restaurant details', error);
      });
  }, []);

  return (
    <div>
      <h1>Restaurants List</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={`/restaurants/${restaurant._id}`}>{restaurant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
