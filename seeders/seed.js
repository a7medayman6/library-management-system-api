const { seedUsers } = require('./users');
const { seedBooks } = require('./books');
const { seedCheckouts } = require('./checkouts');

const seed = async () => 
{
    await seedUsers().then(() => console.log('done seeding users.'));
    await seedBooks().then(() => console.log('done seeding books.'));
    await seedCheckouts().then(() => console.log('done seeding checkouts.'));
}

seed();