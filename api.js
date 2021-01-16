const express = require("express")
const router = express.Router()
const request = require('request');

router.get('/api/rates/', async (req, ress) => {
	let base = req.query.base
	let curr = req.query.currency
    if(base === undefined || curr === undefined){
        return ress.status(400).json({"error": "missing parameter"})
    }
    let overall_obj;
    
    await request('https://api.exchangeratesapi.io/latest', { json: true }, async (err, res, body) => {
    if (err) { return ress.status(500).json({"error":"something went wrong"}) }
    let cur_base = body.rates[base]
	let currenncy_array = curr.split(",")
    let obj = {}
    
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
	await currenncy_array.map(val => {
		obj[val] = body.rates[val] / cur_base
    })
    overall_obj = {
        "results": {
                "base": base,
                "date":year + "-" + month + "-" + day,
                "rates": obj
            }
    }

    return ress.status(200).json(overall_obj)

    });
})

module.exports = router