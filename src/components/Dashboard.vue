<template>
  <!-- App.vue -->
  <v-app>
    <v-navigation-drawer
      class="bg-deep-purple"
      theme="dark"
      :rail="rail"
      permanent
      @click="rail = false"
      v-model="drawer"
    >
      <template v-slot:prepend>
        <v-list-item
          lines="two"
          prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
          :title="user.username"
          subtitle="Logged in"
        ></v-list-item>
      </template>

      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"
          :to="item.to"
          exact
        >
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout">
            <template v-if="rail === true"> <v-icon left>mdi-logout</v-icon> </template>
            <template v-else>
              <v-icon left>mdi-logout</v-icon> Logout
            </template>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="drawerMobile"
      class="bg-deep-purple drawer-custom"
      theme="dark"
      absolute
      temporary
    >
      <template v-slot:prepend>
        <v-list-item
          lines="two"
          prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
          :title="user.username"
          subtitle="Logged in"
        ></v-list-item>
      </template>

      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"
          :to="item.to"
          exact
        >
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- <v-app-bar app> -->
    <!-- <h2>Welcome, {{ user.username }}!</h2>
      <button @click="logout">Logout</button> -->
    <!-- </v-app-bar> -->

    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="navBarToggle()"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Welcome to Dashboard</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="ActiveSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <!-- <Product /> -->
        <router-view :key="$route.path"></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>
  
  <script>
import { useUserStore } from "../stores/user";
import { productStore } from "../stores/product";
import { ref, computed, watchEffect, watch } from "vue";
import router from "../router";
import Product from "./product/index.vue";
import useMediaQuery from "../useMediaQuery";
export default {
  name: "Dashboard",
  components: { Product },
  setup() {
    const userStore = useUserStore();
    const productStr = productStore();
    const windowSize = useMediaQuery();
    console.log("useMediaQuery", windowSize);

    const items = ref([
      {
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        to: "/dashboard",
        value: "dashboard",
      },
      {
        title: "My Account",
        icon: "mdi-account-box",
        to: "/myaccount",
        value: "myaccount",
      },
      { title: "Users", icon: "mdi-gavel", to: "/users", value: "users" },
    ]);
    const drawer = ref(true);
    const drawerMobile = ref(false);
    const rail = ref(false);
    watch(
      () => windowSize.width,
      (newWidth) => {
        if (newWidth > 768) {
          drawer.value = true;
        } else {
          drawer.value = false;
        }
      }
    );

    const newUser = ref("");
    const user = computed(() => userStore.user);
    console.log("user", user);
    const logout = () => {
      userStore.logout();
      router.push("/login");
    };

    watchEffect(() => {
      productStr.getProducts(userStore.user.id);
      if (windowSize.width > 768) {
        drawer.value = true;
      } else {
        drawer.value = false;
      }
    });
    const addUser = () => {
      if (newUser.value) {
        userStore.addUser(newUser.value);
        newUser.value = "";
      }
    };
    const navBarToggle = () => {
      if (windowSize.width > 768) {
        drawer.value = true;
        rail.value = !rail.value;
      } else {
        drawerMobile.value = !drawerMobile.value;
      }
    };
    const ActiveSearch = () => {
      productStr.ActiveSearch();
    };
    return {
      user: user,
      newUser,
      logout,
      addUser,
      items,
      drawer,
      drawerMobile,
      rail,
      navBarToggle,
      ActiveSearch,
      windowSize,
    };
  },
};
</script>
<style scoped>
.drawer-custom{
  height: 100vh !important;
  overflow: auto;
}
</style>
  