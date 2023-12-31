const axios = require('axios');


const users = [
    {
      name: 'John Doe',
      email: 'john@gmail.com'
    }, 
    {
        name: 'Jane Doe',
        email: 'jane@gmail.com'
    },
    {
          name: 'Ahmed',
          email: 'ahmed@gmail.com'
    },
    {
          name: 'Ali',
          email: 'ali@gmail.com'
    },
    {
          name: 'Mohamed',
          email: 'mohamed@gmail.com'
    },
  ];



const seedUsers = async (url, adminCredentials) => {
    for (let i = 0; i < users.length; i++) 
    {
        const user = users[i];
        await axios.post(url, user, {
          auth: {
              username: adminCredentials.username,
              password: adminCredentials.password
          }
      });
    }
}

module.exports = { seedUsers }; 