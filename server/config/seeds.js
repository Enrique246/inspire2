const db = require("./connection");
const { Profile, Product, Category } = require("../models");

db.once("open", async () => {

    // Insert SEEDS for PROFILE here!!!
    await Profile.deleteMany();
    await Profile.create({
        firstName: 'Enrique',
        lastName: 'Contreras',
        email: 'enrique@enrique.com',
        password: 'enrique'
    })
    console.log('profiles seeded');

    ////Insert PRODUCT seed here!!!
    await Category.deleteMany();
    const categories = await Category.insertMany([
    { name: 'SUV' },
    { name: 'Sedan' },
    { name: 'Pickup' }
    ]);
    console.log('categories seeded');

    //Insert PRODUCT seed here!!!
    await Product.deleteMany();
    const products = await Product.insertMany([
        {
        name: "Toyota Prado ",
        description: "Toyota Prado 2012 181,000KM",
        price: 18800,
        category: "SUV",
        availability: true,
        image: "prado.jpg",
        },
        {
        name: "Toyota RAV4",
        description: "Toyota RAV4 2018 67,000KM",
        price: 19800,
        category: "SUV",
        availability: true,
        image: "rav4.jpg",
        },
        {
        name: "Toyota Corolla",
        description: "Toyota Corolla 2016 70,000KM",
        price: 11800,
        category: "Sedan",
        availability: true,
        image: "corolla.jpg",
        },
        {
        name: "Toyota Land Cruiser",
        description: "Toyota Land Cruiser 2013 115,000KM",
        price: 20900,
        category: "SUV",
        availability: true,
        image: "land-cruiser.jpg",
        },
        {
        name: "Toyota Hilux",
        description: "Toyota Hilux 2019 79,000 KM",
        price: 34500,
        category: "Pickup",
        availability: true,
        image: "hilux.jpg",
        },
        {
        name: "Toyota Tundra",
        description: "Toyota Tundra 2014 50,000 KM",
        price: 16900,
        category: "Pickup",
        availability: true,
        image: "tundra.jpg",
        },
    ]);

    console.log("products seeded");
    process.exit();
});