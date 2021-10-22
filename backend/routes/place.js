const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');
const checkAuth = require('../token.js');
const api_key = require('../../keys.json').numbeo_api_key;
const axios = require('axios');

const getCityData = async (city) => {
    const path = `https://www.numbeo.com/api/city_prices?api_key=${api_key}&query=`+city
    const response = await axios.get(path);
    return response.data
}


router.get('/city_prices', async (req, res, next) => {
    try {
        let data = await getCityData(req.query['city'])
        res.status(200).json({data: data})
    } catch (error) {
        console.log(error)
        res.status(500).json({data: error})
    }
});

router.get('/compare/city_prices', async (req, res, next) => {
    try {
        let data1 = await getCityData(req.query['city1'])
        let data2 = await getCityData(req.query['city2'])
        res.status(200).json({city1: data1, city2: data2})
    } catch (error) {
        console.log(error)
        res.status(500).json({data: error})
    }

});

module.exports = router;
