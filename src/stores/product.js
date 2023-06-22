import { defineStore } from 'pinia'
import router from '../router';

const user = JSON.parse(localStorage.getItem('user'));
export const productStore = defineStore('product', {
  state: () => ({
    products:[],
    filterActive:true,
    productDetail:null,
    count:2
    ,
  }),
  getters: {
    // getProducts: (state) => state.products,
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    ActiveSearch(){
      this.filterActive = !this.filterActive
    },
    saveProduct(productData) {
      const existingProducts = localStorage.getItem('products');
      let products = [];
      if (existingProducts) {
        products = JSON.parse(existingProducts);
      }
      const productId = products.length + 1;
      const newProduct = {
        id: productId,
        ...productData
      };
    
      products.push(newProduct);
      const updatedProducts = JSON.stringify(products);
      localStorage.setItem('products', updatedProducts);
      const userProducts = products.filter(product => product.user_id === productData.user_id);
      this.products = userProducts;
    },
    getProducts(id){
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const userProducts = products.filter(product => product.user_id === id);
        this.products = userProducts
    },
    deleteItem(id, user_id){
      const existingProducts = localStorage.getItem('products');
      let products = [];
      if (existingProducts) {
        products = JSON.parse(existingProducts);
      }
    
      // Find the index of the product with the matching ID
      const index = products.findIndex(product => product.id === id);
      
      if (index !== -1) {
        // Remove the product from the array
        products.splice(index, 1);
    
        // Update localStorage with the updated products array
        const updatedProducts = JSON.stringify(products);
        localStorage.setItem('products', updatedProducts);

        const userProducts = products.filter(product => product.user_id === user_id);
        this.products = userProducts;
        router.push("/dashboard");
      }
    },
    updateProdcut(updateProdcut){
      const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
      const index = existingProducts.findIndex(product => product.id === updateProdcut.id);
      
      if (index !== -1) {
        existingProducts[index] = updateProdcut;
        localStorage.setItem('products', JSON.stringify(existingProducts));
        const userProducts = existingProducts.filter(product => product.user_id === updateProdcut.user_id);
        this.products = userProducts;
        this.productDetail = updateProdcut
      }else{
        console.log('fail');
      }
    },
    getProductDetail(id){
      const products = JSON.parse(localStorage.getItem('products')) || [];
      const productDetail  = products.find((product)=> product.id == id);
      if (productDetail) {
        this.productDetail = productDetail;
      } else {
        console.log(`Product with ID ${id} not found.`, );
      }
    }
  },
})

