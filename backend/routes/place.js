const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Place = require('../models/place');
const checkAuth = require('../token.js');
const api_key = require('../../keys.json').numbeo_api_key;
const axios = require('axios');

const getCityData = async (city) => {
    const path = `https://www.numbeo.com/api/city_prices?api_key=${api_key}&query=`+city
    const response = await axios.get(path);
    return response.data
}

const filterData = (data)=>{
    let filtered = {}
    data['prices'].forEach((item) => {
        let products = item['item_name'].split(",");
        item['itemType'] = products.pop();
        item['item_name'] = products.join(",");
        if (filtered[item['itemType']]) {
            filtered[item['itemType']].push(item)
        } else {
            filtered[item['itemType']] = [item]
        }
    }) 
    return filtered
}

router.get('/city_prices', async (req, res, next) => {
    try {
        let data = await getCityData(req.query['city'])
        data['itemsFiltered'] = await filterData(data)
        await Place.create(data);

        res.status(200).json({data: data})
    } catch (error) {
        console.log(error)
        res.status(500).json({data: error})
    }
});

router.get('/compare/city_prices', async (req, res, next) => {
    try {
        let data1 = await getCityData(req.query['city1'])
        data1['itemsFiltered'] = await filterData(data1)
        await Place.create(data1);

        let data2 = await getCityData(req.query['city2'])
        data2['itemsFiltered'] = await filterData(data2)
        await Place.create(data2);

        res.status(200).json({city1: data1, city2: data2})
    } catch (error) {
        console.log(error)
        res.status(500).json({data: error})
    }

});

module.exports = router;
