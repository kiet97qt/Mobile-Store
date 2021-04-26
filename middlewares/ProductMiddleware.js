const {products,configs} = require("../models/core/product");
const mongoose = require("mongoose");
const getProductByName = (name) => products.findOne({ name });
const getProductByID = (product_id) => products.findById(product_id);
const getConfigProductByID = (product_id) => configs.findById(product_id);
const getProductDeleted = (product_id) => products.findOneDeleted({ _id: product_id });
const getConfigProductDeleted = (product_id) => configs.findOneDeleted({ _id: product_id });
const ObjectId = mongoose.Types.ObjectId;

const create = (data) => {
  const { name, brand, discount, configuration, description,cost } = data;
  return getProductByName(name).then((product) => {
    if (product) {
      return Promise.reject("Product already exist!!");
    }
    const productID = new mongoose.Types.ObjectId();
    const newProduct = new products({
      _id: productID,
      name,
      brand,
      discount,
      configuration: productID,
      description,
      cost,  
    });    
    return products.create(newProduct)
    .then((data) => {
      const newConfigs = new configs({
        _id: data._id,
        body: {dimensions: configuration.body.dimensions, weight:configuration.body.weight},    
        display: {type: configuration.display.type, size: configuration.display.size},
        flatform: [
                    {os: configuration.flatform[0].os,chipset: configuration.flatform[0].chipset},
                    {os: configuration.flatform[1].os,chipset: configuration.flatform[1].chipset},
                  ],
        sound: configuration.sound
      });
      return configs.create(newConfigs)
        .then((data)=>Promise.resolve("Create Product Successfully"))
        .catch((err)=> Promise.reject(err))    
    })
    .catch((err) => Promise.reject("Create product failure",err))
  });
};
async function modify(data) {
    let product = await getProductByID(data.query.id).catch(() =>Promise.reject("Wrong ID_Product!!"));
    if (!product) {
      return Promise.reject("Product is not exist!!");
    }
    const bodyProductFields = {
      name: data.body.name,
      brand: data.body.brand,
      discount: data.body.discount,
      cost: data.body.cost,
      description: data.body.description,
    }
    await products.findOneAndUpdate({ _id: data.query.id }, bodyProductFields, {
      new: true,
    })
    let configProduct = await getConfigProductByID(data.query.id).catch(()=>Promise.reject("Wrong ID_ConfigProduct!!"));
    if (!configProduct) {
      return Promise.reject("Configration of this Product is not exist!!");
    }
    await configs.findOneAndUpdate({ _id: data.query.id }, data.body.configuration, {
      new: true,
    })
    return await products.findOne({ _id: data.query.id}).populate({path: 'configuration'})
};
 async function destroy(data,res) {
  let product = await getProductByID(data.query.id).catch(() =>Promise.reject("Wrong ID_Product!!"));
  if (!product) {
    return Promise.reject("Product is not exist!!");
  }
  await products.delete({ _id: data.query.id })
  let configProduct = await getConfigProductByID(data.query.id).catch(()=>Promise.reject("Wrong ID_ConfigProduct!!"));
  if (!configProduct) {
    return Promise.reject("Configration of this Product is not exist!!");
  }
  return await configs.delete({ _id: data.query.id})
};

async function restore(data) {
  let product = await getProductDeleted(data.query.id).catch(() =>Promise.reject("Wrong ID_Product!!"));
  if (!product) {
    return Promise.reject("Product is not exist!!");
  }
  await products.restore({ _id: data.query.id })
  let configProduct = await getConfigProductDeleted(data.query.id).catch(()=>Promise.reject("Wrong ID_ConfigProduct!!"));
  if (!configProduct) {
    return Promise.reject("Configration of this Product is not exist!!");
  }
  await configs.restore({ _id: data.query.id})
};

async function forceDestroy(data) {
  let product = await getProductDeleted(data.query.id).catch(() =>Promise.reject("Wrong ID_Product!!"));
  if (!product) {
    return Promise.reject("Product is not exist!!");
  }
  await products.deleteOne({ _id: data.query.id })
  let configProduct = await getConfigProductDeleted(data.query.id).catch(()=>Promise.reject("Wrong ID_ConfigProduct!!"));
  if (!configProduct) {
    return Promise.reject("Configration of this Product is not exist!!");
  }
  await configs.deleteOne({ _id: data.query.id})
};
const search = (data) => {
  return products.aggregate([
    { $lookup: {
      "from": configs.collection.name,
      "localField": "_id",
      "foreignField": "_id",
      "as": "configuration"
    }}, 
    {$match : {$or:[
      {name: {'$regex' :`${data.body.keyword}`,'$options' : 'i'}},
      {brand: {'$regex' :`${data.body.keyword}`,'$options' : 'i'}},
      {discount: {'$regex' :`${data.body.keyword}`,'$options' : 'i'}},
      {'configuration.body.dimensions': {'$regex' :`${data.body.keyword}`,'$options' : 'i'}},
      {'configuration.flatform.chipset': {'$regex' :`${data.body.keyword}`,'$options' : 'i'}},
      {'configuration.display.type': {'$regex' :`${data.body.keyword}`,'$options' : 'i'}},
      {'configuration.display.size': {'$regex' :`${data.body.keyword}`,'$options' : 'i'}},
      {description: {'$regex' :`${data.body.keyword}`,'$options' : 'i'}},
    ]}},
    {
      $sort : {createdAt: -1}
    } 
  ])
};

module.exports = {
  create,
  modify,
  destroy,
  forceDestroy,
  restore,
  search,
};
