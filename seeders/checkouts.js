const axios = require('axios');

const checkouts = [
    {
      user_id: 1,
      book_id: 1,
      return_date: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    {
      user_id: 2,
      book_id: 2,
      return_date: new Date(new Date().setDate(new Date().getDate() - 8)),
    },
    {
      user_id: 3,
      book_id: 3,
      return_date: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    {
      user_id: 4,
      book_id: 4,
      return_date: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    {
      user_id: 5,
      book_id: 5,
      return_date: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    {
      user_id: 1,
      book_id: 6,
      return_date: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    {
      user_id: 2,
      book_id: 7,
      return_date: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    {
      user_id: 3,
      book_id: 8,
      return_date: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    {
      user_id: 4,
      book_id: 9,
      return_date: new Date(new Date().setDate(new Date().getDate() + 7)),
    },

    
];

const seedCheckouts = async (url, adminCredentials) => {
    for (let i = 0; i < checkouts.length; i++) 
    {
        const checkout = checkouts[i];
        await axios.post(url, checkout, {
          auth: {
            username: adminCredentials.username,
            password: adminCredentials.password
          }
      });
    }
}

module.exports = { seedCheckouts };

