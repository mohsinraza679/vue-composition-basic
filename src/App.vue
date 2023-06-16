<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';
import { useUserStore } from './stores/user';
import router from './router';
export default {
  name: 'App',
  setup() {
    const userStore = useUserStore()
    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logout, 3600000); // 1 hour in milliseconds
      // timeout = setTimeout(inactiveFunction, 3600000); // 1 hour in milliseconds
    };

    const inactiveFunction = () => {
      // Perform your desired actions here
      console.log('User is inactive for one hour');
    };
    const logout = () => {
      userStore.logout();
      router.push("/login");
    }

    onMounted(() => {
      resetTimer();
      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('touchstart', resetTimer);
    });

    onUnmounted(() => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
    });
    return{

    }
  },
}
</script>
