<template>
  <div  class="error-message mx-auto">
    <v-alert type="error">
      {{ errorMessage }}
    </v-alert>
  </div>
</template>
      
      <script>
import { defineProps, computed } from "vue";
import { useUserStore } from "../stores/user";
export default {
  name: "Error",
  props: {
    errorMessage: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const userStore = useUserStore();
    const errorMessage = computed(() => userStore.errorMessage);
    const errorMessageAlert = computed(() => userStore.errorMessageAlert);
    return {
      errorMessage: props.errorMessage,
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
      