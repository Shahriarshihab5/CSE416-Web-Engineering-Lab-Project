use('UserInfo');  // switch to your actual database

db.getCollection('User').insertOne({
  name: "Rakib Bhuiyan",
  email: "rbhuiyan027@gmail.com"
});
