let eye_icon = document.querySelector('.login_pg .eye_icon');
const add_prod_form = document.getElementById('add_prod_form');
const add_blog_form = document.getElementById('add_blog_form');
let the_slugs = Array.from(document.querySelectorAll('.the_slug'));
let the_names = Array.from(document.querySelectorAll('.the_name'));
let chevronDown = `<i class="fa-solid fa-chevron-down chevDownIcon "></i>`;
let dropDownContList = Array.from(document.querySelectorAll('select.form-control'));



// >>>>>>>>>>>>>>>>>>>>>>>> Get Confirmation Before Deleting Products Or Blogs
(async () => {
    let fetchBlog = await fetch('/api/blogs');
    let fetchProd = await fetch('/api/products');

    let resBlog = await fetchBlog.json();
    let resProd = await fetchProd.json();

    if (resBlog && resProd) {
        let deleteDataForms = document.querySelectorAll('form.deleteDataForm');
        if (deleteDataForms) {
            deleteDataForms.forEach((form, ind) => {
                form.addEventListener('submit', (e) => {
                    let conf = confirm('Are You Sure You Want To Delete This Item?')
                    if (!conf) {
                        e.preventDefault()
                    }
                    else {
                        return true
                    }
                })
            })
        }
    }
})();


// >>>>>>>>>>>>>>>>>>>>>>>> Convert Text to Slug - /add-new-prod/ and /add-new-blog Page/
the_slugs.forEach(slug => {
    let [the_name] = the_names
    // console.log('the_name', the_name)

    if (slug) {
        function convertToSlug() {
            // console.log(slug.value);
            if (!the_name.value) {
                alert('First add Product or Blog Name!');
                slug.value = '';
            }
            const getSlug = the_name.value.toLowerCase().trim().replace(/&/g, 'and').replace(/\s*-\s*/g, '-').replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
            slug.value = getSlug;
        }
        slug.addEventListener('click', convertToSlug);
        slug.addEventListener('input', convertToSlug);
    }
})


// >>>>>>>>>>>>>>>>>>>>>>>> Re-check auth by requesting a secure resource (or reloading)
window.addEventListener('pageshow', function (event) {
    if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
        window.location.reload();
        // alert('page reloaded!')
    }
});


// >>>>>>>>>>>>>>>>>>>>>>>> Added a Chevron Icon on DropDowns in Form
dropDownContList.map(dropDown => dropDown.insertAdjacentHTML("afterend", chevronDown))


// >>>>>>>>>>>>>>>>>>>>>>>> Password Toggle Functionality - Login Page
if (eye_icon) {
    eye_icon.addEventListener('click', (e) => {
        e.preventDefault();
        let password = document.querySelector('.password_cont #password');
        let eye_icon_inside = eye_icon.querySelector('.fa-regular ')

        if (eye_icon_inside.classList.contains('fa-eye') && password.type == 'password') {
            password.type = 'text';
            eye_icon_inside.classList.add('fa-eye-slash')
            eye_icon_inside.classList.remove('fa-eye')
        }
        else {
            password.type = 'password';
            eye_icon_inside.classList.add('fa-eye')
            eye_icon_inside.classList.remove('fa-eye-slash')
        }
    })
}


// >>>>>>>>>>>>>>>>>>>>>>>> Add New Product Form Submit Data - add-new-prod Page
// if (add_prod_form) {
//     add_prod_form.addEventListener('submit', (event) => {
//         event.preventDefault(); // Prevent default form submission

//         const formData = new FormData(add_prod_form);
//         const data = {
//             id: Number(formData.get('id')),
//             name: formData.get('name'),
//             slug: formData.get('slug'),
//             feat_img: formData.get('feat_img'),
//             img_gallery: formData.get('img_gallery').split(',').map(url => url.trim()),
//             // img_gallery: formData.get('img_gallery'),
//             // img_gallery: [formData.get('img_gallery')],
//             price: {
//                 reg_price: Number(formData.get('reg_price')),
//                 sale_price: Number(formData.get('sale_price')) ? Number(formData.get('sale_price')) : null
//             },
//             description: formData.get('description'),
//             specifications: formData.get('specifications'),
//             compatibility: formData.get('compatibility'),
//             inStock: formData.get('inStock'),
//             category: formData.get('category'),
//             featured_col: formData.get('featured_col')
//         };

//         // Convert to a plain object for easy access
//         const dataAsObject = Object.fromEntries(formData.entries());
//         console.log('Form data as object:', dataAsObject);

//         console.log('data', data)

//         // Access individual values
//         console.log('Prod Name:', formData.get('name'));
//         console.log('Img Gallery:', formData.get('img_gallery'));
//     });
// }



// >>>>>>>>>>>> Add New Blog Form Submit Data - add-new-blog Page
// if (add_blog_form) {
//     add_blog_form.addEventListener('submit', (event) => {
//         event.preventDefault(); // Prevent default form submission

//         const formData = new FormData(add_blog_form);

//         const data = {
//             blog_id: Number(formData.get('blog_id')),
//             blog_title: formData.get('blog_title'),
//             blog_slug: formData.get('blog_slug'),
//             blog_excerpt: formData.get('blog_excerpt'),
//             blog_feat_img: formData.get('blog_feat_img'),
//             blog_inside_img: formData.get('blog_inside_img'),
//             blog_category: formData.get('blog_category'),
//             blog_tags: formData.get('blog_tags'),
//             blog_content: formData.get('blog_content'),
//         };

//         // Convert to a plain object for easy access
//         const dataAsObject = Object.fromEntries(formData.entries());
//         // console.log('Blog data as object:', dataAsObject);

//         console.log('Blog data', data)

//         // Access individual values
//         console.log('Prod Name:', formData.get('blog_title'));
//         console.log('Img Gallery:', formData.get('blog_feat_img'));
//     });

// }
