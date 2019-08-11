const express = require('express')
const helmet = require('helmet')

const db = require('../data/dbConfig')

const server = express()

// Middleware 🖕
server.use(helmet())
server.use(express.json())

// Endpoints go here 🛑

// GET Post ✳️
server.get('/', async (req, res) => {
  try {
    const dealers = await db.select('*').from('car-dealers')
    res.status(200).json(dealers)
  } catch (err) {
    res.status(500).json({
      message: 'Error getting car dealers ☠️', error: err
    })
  }
})

// GET Post by ID 🆔
server.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const [dealer] = await db.select('*').from('car-dealers').where({ id })
    if (dealer) {
      res.status(200).json(dealer)
    } else {
      res.status(404).json({
        message: 'Could not find the dealership id 🤷‍'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving the dealership ☠️', error: err
    })
  }
})

// ADD Post ➕
server.post('/', async (req, res) => {
  const dealerData = req.body
  try {
    const dealer = await db('car-dealers').insert(dealerData)
    if (dealer) {
      res.status(201).json(dealer)
    }
  } catch (err) {
      res.status(500).json({
        message: 'Could not add your dealership to the database 💩',
        error: err
      })
  }
})

// UPDATE Post 💻
server.put('/:id', async (req, res) => {
  const { id } = req.params
  const changes = req.body
  try {
    const count = await db('car-dealers').where('id', '=', id).update(changes)
    if (count) {
      res.status(200).json(count)
    } else {
      res.status(400).json({
        message: 'Could not update the car dealership 💩'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Could not update the car dealership 💩',
      error: err
    })
  }
})

// DELETE Post ☠️
server.delete('/:id', async (req, res) => {
  const { id } = req.params
  const dealer = req.body
  try {
    const count = await db('car-dealers').where('id', '=', id).del(dealer)
    if (count > 0) {
      res.status(200).json({
        message: 'The dealership has been destroyed ☠️'
      })
    } else {
      res.status(404).json({
        message: 'The dealership you are looking to delete could not be found 🤷‍'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Destruction of dealership was unsuccessful 💩'
    })
  }
})

module.exports = server