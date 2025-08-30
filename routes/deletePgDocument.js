
module.exports = function delPgDoc(category, id) {
    let docStr = `
            <!DOCTYPE html>
            <html lang="en">

            <head>

                <!-- >>>>>>>>>>>>>> IMP Meta Tags -->
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
                <meta http-equiv="Pragma" content="no-cache" />
                <meta http-equiv="Expires" content="0" />
    <link rel="icon" type="image/svg+xml" href="assets/favicon.svg" />

                <title>Product Deleted Successfully</title>

                <!-- >>>>>>>>>>>>>> Custom Stylesheet -->
                <!-- <link rel="stylesheet" href="style.css"> -->

                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');

                    .delete_prod_pg_cont .texts i {
                        background: #f7f7f7;
                        border-radius: 50px;
                        font-size: 40px;
                        color: #BC2D3B;
                        width: 90px;
                        height: 90px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        box-shadow: -1px 1px 16px 0px #a5a5a5;
                        margin-bottom: 25px;
                    }
                    
                    .delete_prod_pg_cont .texts h2 {
                        font-family: Poppins;
                        font-size: 30px;
                        line-height: 30px;
                        margin-bottom: 6px;
                    }

                    .delete_prod_pg_cont .texts h3 {
                        font-family: Montserrat;
                        font-size: 22px;
                        line-height: 30px;
                        color: #595959;
                    }
                </style>

                <!-- >>>>>>>>>>>>>> Font Awsome -->
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
                    integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
                    crossorigin="anonymous" referrerpolicy="no-referrer" />

                <!-- >>>>>>>>>>>>>> Bootstrap -->
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet"
                    integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr" crossorigin="anonymous">

            </head>

            <body>


                <div style="height: 100vh;"
                    class=" delete_prod_pg_cont w-100 mx-0 d-flex flex-column justify-content-center align-items-center ">
                    <div class="texts d-flex flex-column align-items-center  ">
                        <i class="fa-solid fa-trash-can"></i>

                        <h2>${category} has been Deleted</h2>
                        <h3>${category} with ID: ${id} has been Deleted Successfully!</h3>
                    </div>
                </div>

                <script>
                    let urlParams = new URLSearchParams(window.location.search);

                    urlParams.has('blog_id') 
                    ? setTimeout(() => window.location.href = "/blogs", 3500) 
                    : setTimeout(() => window.location.href = "/products", 3500);
                </script>

                <!-- >>>>>>>>>>>>>>>>>> Bootstrap JS -->
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q"
                    crossorigin="anonymous"></script>
            </body>

            </html>
    `
    return docStr;
}
