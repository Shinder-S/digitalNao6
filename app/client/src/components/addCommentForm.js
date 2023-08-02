import React, { useState } from 'react';
import axios from 'axios';

const addCommentForm = ({ restaurantId }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/restaurants/${restaurantId}/comments`, { text })
      .then((response) => {
        console.log('Comment added with success');
      })
      .catch((error) => {
        console.error('Error trying to add the comment', error);
      });
  };

  return (
    <div>
      <h3>Add Comment</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Comment:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default addCommentForm;
