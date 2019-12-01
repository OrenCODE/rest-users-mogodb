const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../../validation/customer');
const Customer = require('../../models/customer');

// get all customers
router.get('/', (req,res)=> {
    Customer.find()
        .then(customers => res.json(customers));
});

router.get('/search', (req, res) => {
    if(req.query.name) {
        Customer.find({"name": {$regex: RegExp(req.query.name)}})
            .then(results => {
                res.json(results)
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    msg: "something went wrong"
                })
            })
    }
    if(req.query.email){
        Customer.find({"email": {$regex: RegExp(req.query.email)}})
            .then(results => {
                res.json(results)
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    msg: "something went wrong"
                })
            })
    }

    if(req.query.phone){
        Customer.find({"phone": {$regex: RegExp(req.query.phone)}})
            .then(results => {
                res.json(results)
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    msg: "something went wrong"
                })
            })
    }
});

// add new customer
router.post('/', (req, res) => {
    const phone = req.body.phone.toString();
    const request = {
        name: req.body.name,
        email: req.body.email,
        phone: phone
    };
    const {errors, isValid} = validateRegisterInput(request);
    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
        const customer = new Customer({
            name: request.name,
            email: request.email,
            phone: request.phone
        });

        customer.save()
            .then(() => res.json({status: 'success'}))
    });

module.exports = router;
