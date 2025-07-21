const path = require('path');
const express = require('express');
const router = express.Router();
let Blog = require('../models/blogs');
const checkAuthAdmin = require('../middleware/auth');
const delPgDoc = require('./deletePgDocument');

// >>>>>>>>>>>>>>>>> Find All - Blog
router.get('/', async (req, res) => {
    try {
        const all_prods = await Blog.find({}, { _id: 0, __v: 0 }).sort({ id: 1 });
        // const all_prods = await Blog.find({}).sort({ id: 1 });
        res.status(200).send(all_prods)
    }
    catch (err) {
        // console.log('err.message', err.message)
        res.json({ message: err.message });
    }
})


// >>>>>>>>>>>>>>>>> Find by Slug - Blogs
router.get('/:blog_slug', async (req, res) => {
    try {
        // let single_product = await Blog.findOne({ slug: req.params.slug }, { _id: 0, __v: 0 }).sort({ id: 1 });
        let single_blog = await Blog.findOne({ blog_slug: req.params.blog_slug }, { _id: 0, __v: 0 })
        res.status(200).json(single_blog);
    } catch (err) {
        // console.log('err.message', err.message)
        res.json({ message: err.message });
    }
})


// >>>>>>>>>>>>>>>>> POST Single Blog
router.post('/', checkAuthAdmin, async (req, res) => {
    let newBlog = new Blog({
        blog_title: req.body.blog_title,
        blog_slug: req.body.blog_slug,
        blog_excerpt: req.body.blog_excerpt,
        blog_feat_img: req.body.blog_feat_img,
        blog_inside_img: req.body.blog_inside_img,
        blog_category: req.body.blog_category,
        blog_tags: req.body.blog_tags,
        blog_content: req.body.blog_content,
    })

    try {
        await newBlog.save();
        res.redirect('/blogs');
    }
    catch (err) {
        res.status(400).json({ message: err.message });
        // console.log('err.message', err.message)
    }
});


// >>>>>>>>>>>>>>>>> Update a Blog
router.post('/update/:blog_slug', checkAuthAdmin, async (req, res) => {

    try {
        const updatedData = {
            blog_title: req.body.blog_title,
            blog_slug: req.body.blog_slug,
            blog_excerpt: req.body.blog_excerpt,
            blog_feat_img: req.body.blog_feat_img,
            blog_inside_img: req.body.blog_inside_img,
            blog_category: req.body.blog_category,
            blog_tags: req.body.blog_tags,
            blog_content: req.body.blog_content,
        };

        await Blog.findOneAndUpdate({ blog_slug: req.params.blog_slug }, updatedData);

        res.status(200).json({ message: "Blog updated successfully" });
    } catch (err) {
        // console.log("Update Error:", err.message);
        res.status(500).json({ message: "Error updating blog" });
    }
});


// >>>>>>>>>>>>>>>>> Delete a Blog
router.post('/delete', checkAuthAdmin, async (req, res) => {
    try {
        const blog_id = parseInt(req.query.blog_id);
        const blog = await Blog.findOneAndDelete({ blog_id: blog_id });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.send(delPgDoc("Blog", blog_id));

    } catch (err) {
        res.status(500).send('Error deleting blog');
    }
});

module.exports = router;
