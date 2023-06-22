<template>
  <div v-if="errorMessageAlert == true" class="error-message mx-auto">
    <v-alert dense
      outlined
      type="error"
      icon="mdi-alert-circle"
      >
      {{ errorMessage }}
    </v-alert>
  </div>
</template>
      
      <script>
import { defineProps, computed } from "vue";
import { useUserStore } from "../stores/user";
export default {
  name: "Error",
  setup() {
    const userStore = useUserStore();
    const errorMessage = computed(() => userStore.errorMessage);
    const errorMessageAlert = computed(() => userStore.errorMessageAlert);
    return {
      errorMessage,
      errorMessageAlert,
    };
  },
};
</script>
      <style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
.error-message {
  width: 50%;
  position: relative;
}
.error-message .v-alert {
  position: absolute;
  width: 50%;
  right: 235px;
  top: 70px;
}
</style>
      