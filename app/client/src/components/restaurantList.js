import React, { useState, useEffect } from 'react';
import axios from 'axios';

const restaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get('/restaurants')
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error('Error when getting the list of restaurants', error);
      });
  }, []);

  return (
    <div>
      <h1>Restaurant List</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant._id}>
            <a href={`/restaurants/${restaurant._id}`}>{restaurant.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default restaurantList;