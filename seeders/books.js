const axios = require('axios');

const books = [
    {
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      ISBN: '9780544003415',
      available_copies: 5,
    },
    {
      title: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      ISBN: '9780618640157',
      available_copies: 3,
    },
    {
      title: 'Harry Potter and the Philosopher\'s Stone',
      author: 'J.K. Rowling',
      ISBN: '9780747532743',
      available_copies: 2,
    },
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
      ISBN: '9780439064873',
      available_copies: 1,
    },
    {
      title: 'Harry Potter and the Prisoner of Azkaban',
      author: 'J.K. Rowling',
      ISBN: '9780439136365',
      available_copies: 1,
    },
    {
      title: 'The Da Vinci Code',
      author: 'Dan Brown',
      ISBN: '9780307474278',
      available_copies: 1,
    },
    {
      title: 'Angels & Demons',
      author: 'Dan Brown',
      ISBN: '9780671027360',
      available_copies: 1,
    },
    {
      title: 'The Lost Symbol',
      author: 'Dan Brown',
      ISBN: '9780385504225',
      available_copies: 1,
    },
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      ISBN: '9780743273565',
      available_copies: 10,
    },
]

const seedBooks = async () => {
    for (let i = 0; i < books.length; i++) 
    {
        const book = books[i];
        await axios.post('http://localhost:3000/api/v1/books', book);
    }
}

module.exports = { seedBooks };