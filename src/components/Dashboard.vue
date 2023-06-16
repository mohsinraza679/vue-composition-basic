<template>
  <div>
    <div class="d-flex justify-space-between pa-6">
      <h2>Welcome, {{ user.username }}!</h2>
      <button @click="logout">Logout</button>
    </div>
    <hr />
    <Product />
  </div>
</template>
  
  <script>
import { useUserStore } from "../stores/user";
import { productStore } from '../stores/product'
import { ref, computed , watchEffect} from "vue";
import router from "../router";
import Product from './product/index.vue'
export default {
  name: "Dashboard",
  components:{Product},
  setup() {
    const userStore = useUserStore();
    const productStr = productStore();
    const newUser = ref("");
    const user = computed(() => userStore.user);
    console.log('user', user);
    const logout = () => {
      userStore.logout();
      router.push("/login");
    };

    watchEffect(() => {
      productStr.getProducts(userStore.user.id)
    });
    const addUser = () => {
      if (newUser.value) {
        userStore.addUser(newUser.value);
        newUser.value = "";
      }
    };

    return {
      user: user,
      newUser,
      logout,
      addUser,
    };
  },
};
</script>
  