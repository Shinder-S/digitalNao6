import React, { useState } from 'react';
import axios from 'axios';

const AddCommentForm = ({ restaurantId }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/restaurants/${restaurantId}/comments`, { text })
      .then((response) => {
        console.log('Comment was added successfully');
      })
      .catch((error) => {
        console.error('Error when comment was added', error);
      });
  };

  return (
    <div>
      <h3>Add your comment</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Drop your comment:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button type="submit">Add comment</button>
      </form>
    </div>
  );
};

export default AddCommentForm;