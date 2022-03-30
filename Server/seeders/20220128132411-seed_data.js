'use strict';

const { encrypt } = require("../helpers/bycrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Users', [{
      username: "admin",
      email: "admin@gmail.com",
      password: encrypt('admin'),
      role: "admin",
      phoneNumber: "087745678986",
      address: "Mataram",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Categories', [{
      name: "Main Course",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Dessert",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Beverage",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Items', [{
      name: "Wingers-Edit",
      description: "Sayap Ayam KFC 3 pieces",
      price: 22000,
      imgUrl: "https://files.kfcku.com/uploads/media/dummy/food/kfc-web_wingers_l.png",
      authorId: 1,
      categoryId: 1,
      ingredient:"Chicken Wings",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Coca-Cola",
      description: "Minuman Coca-Cola KFC",
      price: 15000,
      imgUrl: "https://image.cermati.com/q_70/uy0bkupnfjtkvzookmdp.webp",
      authorId: 1,
      categoryId: 3,
      ingredient:"Soft Drinks",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Ice Cream Sundae Coklat",
      description: "Ice cream KFC dengan Coklat Jam",
      price: 10000,
      imgUrl: "https://www.mcdonalds.com.mt/wp-content/uploads/2018/05/chocolate-sundae.jpg",
      authorId: 1,
      categoryId: 2,
      ingredient:"Ice Cream Plan",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Sphageti Deluxe",
      description: "Spagheti KFC",
      price: "15000",
      imgUrl: "https://files.kfcku.com/uploads/media/dummy/food/kfc-web_spaghettydeluxe_l.png",
      authorId: 2,
      categoryId: 1,
      ingredient:"Mie Spagethi",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Ingredients', [{
      itemId: 1,
      name: "Chicken Wings",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      itemId: 2,
      name: "Soft Drinks",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      itemId: 3,
      name: "Ice Cream Plan",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      itemId: 4,
      name: "Mie Spagethi",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ingredients', null, {});
    await queryInterface.bulkDelete('Items', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
