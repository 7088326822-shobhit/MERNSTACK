const backendDomain = "http://localhost:8000"

const SummaryApi = {
    signUp : {
        url : `${backendDomain}/api/signup`,
        method: 'post'
    },

    signIn : {
        url : `${backendDomain}/api/signin`,
        method: 'post'
    },
    current_user : {
        url : `${backendDomain}/api/user-details`,
        method: "get"
    },
    logout_user : {
        url: `${backendDomain}/api/userLogout`,
        method: "get"
    },
    allUser : {
        url: `${backendDomain}/api/all-user`,
        method: "get"
    },
    updateUser : {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    uploadController : {
        url : `${backendDomain}/api/upload-product`,
        method: 'post'
    },
    allProduct : {
        url: `${backendDomain}/api/get-products`,
        method: "get"
    },

    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    categoryProduct: {
        url: `${backendDomain}/api/get-categoryProduct`,
        method: 'get'
    },
    categoryWiseProduct: {
        url: `${backendDomain}/api/category-product`,
        method: 'post'
    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: 'post'
    },

    addToCartProduct: {
        url: `${backendDomain}/api/addToCart`,
        method: 'post'
    },
    addToCartProductCount: {
        url: `${backendDomain}/api/countAddToCartProduct`,
        method: 'get'
    },

    addTocartProductView : {
        url: `${backendDomain}/api/View-cart-product`,
        method: 'get'
    },

    updateCartProduct: {
        url: `${backendDomain}/api/update-cart-product`,
        method: 'post'
    },

    deleteCartProduct : {
        url : `${backendDomain}/api/delete-product-cart`,
        method: 'post'
    },

    searchProduct: {
        url: `${backendDomain}/api/search-product`,
        method: 'get'
    },
    filterProduct : {
      url: `${backendDomain}/api/filter-product`,
      method: 'post'
    }


}

export default SummaryApi