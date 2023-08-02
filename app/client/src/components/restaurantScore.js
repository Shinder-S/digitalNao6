import React, { useState, useEffect } from 'react';
import axios from 'axios';

const restaurantScore = (props) => {
  const [restaurant, setRestaurant] = useState(null);
  const restaurantId = props.match.params.id;

  useEffect(() => {
    axios.get(`/restaurants/${restaurantId}`)
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((error) => {
        console.error('Error when getting the list of restaurants', error);
      });
  }, [restaurantId]);

  return (
    <div>
      {restaurant ? (
        <div>
          <h2>{restaurant.name}</h2>
          <h3>Comments:</h3>
          <ul>
            {restaurant.comments.map((comment, index) => (
              <li key={index}>{comment.text}</li>
            ))}
          </ul>
          <AddCommentForm restaurantId={restaurant._id} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default restaurantScore;
