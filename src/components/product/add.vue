<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">User Profile</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="title"
              label="title*"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="Product Name" hint=""></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="Availability*" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              clear-icon="mdi-close-circle"
              label="Product Description"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="callParent(false)">
        Close
      </v-btn>
      <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
   
<script>
import { useUserStore } from "../../stores/user";
import { ref, computed } from "vue";
import router from "../../router";
import { defineComponent, inject } from 'vue';

export default {
  name: "Dashboard",
  setup() {
    const userStore = useUserStore();
    const callParent = () => {
        const closeDialog = inject('closeDialog');
        if (closeDialog) {
            closeDialog();
        }
    }
    return {
        callParent
    };
  },
};
</script>
      