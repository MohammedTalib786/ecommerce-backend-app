let mongoose = require('mongoose');
let { blogDB } = require('../db/db');
const AutoIncrement = require('mongoose-sequence')(blogDB); // Import plugin

let blogSchema = new mongoose.Schema({
    blog_id: Number,
    blog_title: {
        type: String,
        required: true
    },
    blog_slug: {
        type: String,
        required: true
    },
    blog_feat_img: {
        type: String,
        required: true
    },
    blog_inside_img: {
        type: String,
        required: true
    },
    blog_category: {
        type: String,
        required: true
    },
    blog_tags: {
        type: String,
        required: true
    },
    blog_content: {
        type: String,
        required: true
    },
    blog_excerpt: {
        type: String,
        required: true
    },
});

blogSchema.plugin(AutoIncrement, { inc_field: 'blog_id', start_seq: 1 });

blogSchema.set('toJSON', {
    transform: (doc, ret) => {
        return {
            blog_id: ret.blog_id, // First field
            blog_title: ret.blog_title,
            blog_slug: ret.blog_slug,
            blog_excerpt: ret.blog_excerpt,
            blog_feat_img: ret.blog_feat_img,
            blog_inside_img: ret.blog_inside_img,
            blog_category: ret.blog_category,
            blog_tags: ret.blog_tags,
            blog_content: ret.blog_content,
        };
    }
});

module.exports = blogDB.model('Blog', blogSchema);
// 👈 The third parameter in mongoose.model() tells Mongoose to use all_users as the collection name exactly as it is.
