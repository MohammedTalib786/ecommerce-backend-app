const path = require('path');
const express = require('express');
const router = express.Router();
let Product = require('../models/products');
const checkAuthAdmin = require('../middleware/auth');
const delPgDoc = require('./deletePgDocument');

// >>>>>>>>>>>>>>>>> Find All - Products
router.get('/', async (req, res) => {
    try {
        const all_prods = await Product.find({}, { _id: 0, __v: 0 }).sort({ id: 1 });
        // const all_prods = await Product.find({}).sort({ id: 1 });
        res.status(200).send(all_prods)
    }
    catch (err) {
        // console.log('err.message', err.message)
        res.json({ message: err.message });
    }
})


// >>>>>>>>>>>>>>>>> Find by Slug - Products
router.get('/:slug', async (req, res) => {
    try {
        // let single_product = await Product.findOne({ slug: req.params.slug }, { _id: 0, __v: 0 }).sort({ id: 1 });
        let single_product = await Product.findOne({ slug: req.params.slug }, { _id: 0, __v: 0 })
        res.status(200).json(single_product);
    } catch (err) {
        // console.log('err.message', err.message)
        res.json({ message: err.message });
    }
})


// >>>>>>>>>>>>>>>>> POST Single Product
router.post('/', checkAuthAdmin, async (req, res) => {
    let img_gallery_main = req.body.img_gallery;

    let newProduct = new Product({
        sku: req.body.sku,
        name: req.body.name,
        slug: req.body.slug,
        feat_img: req.body.feat_img,
        img_gallery: img_gallery_main.split(',').map(url => url.trim()),
        price: {
            reg_price: req.body.reg_price,
            sale_price: req.body.sale_price,
        },
        description: req.body.description,
        excerpt: req.body.excerpt,
        specifications: req.body.specifications,
        compatibility: req.body.compatibility,
        inStock: req.body.inStock,
        category: req.body.category,
        featured_col: req.body.featured_col
    })

    try {
        await newProduct.save();
        res.redirect('/products');
    }
    catch (err) {
        res.status(400).json({ message: err.message });
        // console.log('err.message', err.message)
    }
});


// >>>>>>>>>>>>>>>>> Update a Product
router.post('/update/:slug', checkAuthAdmin, async (req, res) => {
    let img_gallery_main = req.body.img_gallery
    try {
        const updatedData = {
            sku: req.body.sku,
            name: req.body.name,
            slug: req.body.slug,
            feat_img: req.body.feat_img,
            img_gallery: img_gallery_main.split(',').map(url => url.trim()),
            price: {
                reg_price: req.body.reg_price,
                sale_price: req.body.sale_price
            },
            description: req.body.description,
            excerpt: req.body.excerpt,
            specifications: req.body.specifications,
            compatibility: req.body.compatibility,
            inStock: req.body.inStock,
            category: req.body.category,
            featured_col: req.body.featured_col,
        };

        await Product.findOneAndUpdate({ slug: req.params.slug }, updatedData);

        res.status(200).json({ message: "Product updated successfully" });
    } catch (err) {
        // console.log("Update Error:", err.message);
        res.status(500).json({ message: "Error updating product" });
    }
});


// >>>>>>>>>>>>>>>>> Delete a Product
router.post('/delete', checkAuthAdmin, async (req, res) => {
    try {
        const id = parseInt(req.query.id);
        const product = await Product.findOneAndDelete({ id: id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.send(delPgDoc("Product", id));

    } catch (err) {
        res.status(500).send('Error deleting product');
        // console.log('err.message in del prod', err.message)
    }
});


module.exports = router;
