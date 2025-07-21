let mongoose = require('mongoose');
let { prodsDB } = require('../db/db')
const AutoIncrement = require('mongoose-sequence')(prodsDB); // Import plugin

let prodSchema = new mongoose.Schema({
    id: Number,
    sku: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    feat_img: {
        type: String,
        required: true
    },
    img_gallery: {
        type: [String],
        required: true
    },
    price: {
        reg_price: Number,
        sale_price: Number
    },
    description: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    specifications: {
        type: String,
    },
    compatibility: {
        type: String,
    },
    inStock: {
        type: Boolean,
    },
    category: {
        type: String,
    },
    featured_col: {
        type: Boolean,
    },
});

prodSchema.plugin(AutoIncrement, { inc_field: 'id', start_seq: 1 });

prodSchema.set('toJSON', {
    transform: (doc, ret) => {
        return {
            id: ret.id, // First field
            sku: ret.sku,
            name: ret.name,
            slug: ret.slug,
            feat_img: ret.feat_img,
            img_gallery: ret.img_gallery,
            price: ret.price,
            description: ret.description,
            excerpt: ret.excerpt,
            specifications: ret.specifications,
            compatibility: ret.compatibility,
            inStock: ret.inStock,
            category: ret.category,
            featured_col: ret.featured_col
        };
    }
});

module.exports = prodsDB.model('Product', prodSchema);
