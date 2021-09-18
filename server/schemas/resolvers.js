const { AuthenticationError } = require('apollo-server-express');
const { Profile, Product, Category, Order, Stock } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    profile: async (parent, args, context) => {
      if (context.profile) {
        const profile = await Profile.findById(context.profile._id).populate({
          path: 'orders.products',
          populate: 'category'
        }).populate({
          path: 'stock.products',
          populate: 'category'
        })

        profile.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return profile;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.profile) {
        const profile = await Profile.findById(context.profile._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return profile.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    stock: async (parent, { _id }, context) => {
      if (context.profile) {
        const profile = await Profile.findById(context.profile._id).populate({
          path: 'stock.products',
          populate: 'category'
        });

        return profile.stock.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate('products').execPopulate();

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: parseInt(products[i].price)  * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          availability: 1
        });
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },

  Mutation: {
    addProfile: async (parent, args) => {
      const profile = await Profile.create(args);
      const token = signToken(profile);

      return { token, profile };
    },

    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(profile);

      return { token, profile };
    },
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.profile) {
        const order = new Order({ products });

        await Profile.findByIdAndUpdate(context.profile._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    addStock: async (parent, { products }, context) => {
      console.log(context);
      if (context.profile) {
        const stock = new Stock({ products });

        await Profile.findByIdAndUpdate(context.profile._id, { $push: { stock: stock } });

        return stock;
      }

      throw new AuthenticationError('Not logged in');
    },
    addProduct: async(parent,args, context) => {
      console.log(context);
      if(context){
        /* const product = new Product(args); */
        const product =await Product.create(args);
        await Profile.findByIdAndUpdate(context.profile._id, { $push: { products: product , stock:{products: product}  }});

        return product;

      }

      throw new AuthenticationError('Not logged in');
    },
    deleteUserProduct: async(parent,{_id}, context) => {
         
      if(context){
       const product =await Product.findById(_id);
        console.log(product);
        await Profile.findByIdAndUpdate(context.profile._id, { $pull: {  stock:{products: product}  }});
        return product
      }

      throw new AuthenticationError('Not logged in');
    },
    deleteProduct: async(parent,{_id}, context) => {
         
      if(context){
        const product =await Product.findById(_id);
        
        await Profile.findByIdAndUpdate(context.profile._id, { $pull: {  stock:{products: product}  }});
        await Product.deleteOne(product)
       
        return "Deleted"
      
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.profile) {
        return await Profile.findByIdAndUpdate(context.profile._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateProduct: async (parent, { _id, availability }) => {
      const decrement = Math.abs(availability) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { availability: decrement } }, { new: true });
    },
    updateQuantityProduct: async (parent, { _id, availability }) => {
      const decrement = Math.abs(availability) -1;

      return await Product.findByIdAndUpdate(_id, {availability: decrement}, { new: true });
    },
    addCategory: async (parent, args,context) => {
      console.log(context);
      if (context.profile) {
        const category = await Category.create(args);

        await Profile.findByIdAndUpdate(context.profile._id, { $push: { categories: category } });

        return category;
      }
      throw new AuthenticationError('Not logged in');
    }, 
      
  }
};

module.exports = resolvers;