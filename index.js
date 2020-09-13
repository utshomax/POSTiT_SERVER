

require('dotenv').config()
const fastify = require('fastify')({
    logger: true
  })
const routes = require('./src/routes')

const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000;

const uri=process.env.MONGODB_URI ||'mongodb://localhost/podtsdb';

  // Connect to DB
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false})
   .then(() => console.log('MongoDB connected…'))
   .catch(err => console.log(err))



routes.forEach((route, index) => {
    fastify.route(route)
   })
  // Declare a route
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
  
  // Run the server!
  const start = async () => {
    try {
      await fastify.listen(PORT,'0.0.0.0')
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()