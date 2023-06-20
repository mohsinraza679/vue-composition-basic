<template>
  <div>
    
    <div class="text-end ">
      <v-btn class="my-2" @click="openDialog" variant="outlined">add Product</v-btn>
    </div>
  </div>
  <Productdetail />
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title>
            <span class="text-h5">User Product</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    v-model="product_title"
                    :rules="titleRules"
                    label="title*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    v-model="product_name"
                    label="Product Name"
                    hint=""
                    required
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="product_availability"
                    :items="states"
                    label="State"
                    multiple
                    chips
                    small-chips
                    outlined
                    dense
                    :rules="availabilityRules"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="product_description"
                    :rules="descriptionRules"
                    required
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
            <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="saveProduct">
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
 
    
    <script>
import { useUserStore } from "../../stores/user";
import { productStore } from "../../stores/product";
import { ref, computed, reactive } from "vue";
import router from "../../router";
import Productdetail from "./view.vue";
import addProduct from "./add.vue";
export default {
  name: "Dashboard",
  components: { Productdetail },
  setup() {
    const userStore = useUserStore();
    const productStr = productStore();
    const data = reactive({
      states: [
        "12:00AM",
        "01:00AM",
        "02:00AM",
        "03:00AM",
        "04:00AM",
        "05:00AM",
        "06:00AM",
        "07:00AM",
        "08:00AM",
        "09:00AM",
        "10:00AM",
        "11:00AM",
        "12:00PM",
        "01:00PM",
        "02:00PM",
        "03:00PM",
        "04:00PM",
        "05:00PM",
        "06:00PM",
        "07:00PM",
        "08:00PM",
        "09:00PM",
        "10:00PM",
        "11:00PM",
      ],
    });

    const dialog = ref(false);
    const product_title = ref("");
    const product_name = ref("");
    const product_availability = ref(null);

    const product_description = ref("");
    const valid = ref(true);
    const saveProduct = () => {
      const prodcutData = {
        product_title: product_title.value,
        product_name: product_name.value,
        product_availability: product_availability.value,
        product_description: product_description.value,
        user_id: userStore.user.id,
      };
      if (
        product_title.value &&
        product_name.value &&
        product_availability.value.length > 0 &&
        product_description.value
      ) {
        productStr.saveProduct(prodcutData);
        dialog.value = false;
        product_title.value = "";
        product_name.value = "";
        product_availability.value = null;
        product_description.value = "";
      } else {
        validate();
      }
    };
    const user = computed(() => userStore.user);

    const titleRules = computed(() => [(v) => !!v || "Title is required"]);
    const nameRules = computed(() => [(v) => !!v || "Name is required"]);
    const availabilityRules = computed(() => [
      (v) => !!v || "Availability is required",
    ]);
    const descriptionRules = computed(() => [
      (v) => !!v || "Description is required",
    ]);

    const form = ref(null);
    const validate = () => {
      form.value.validate();
    };

    const openDialog = () => {
      dialog.value = true;
    };

    return {
      username: userStore.user.username,
      dialog,
      openDialog,
      saveProduct,
      product_title,
      product_name,
      product_availability,
      product_description,
      titleRules,
      nameRules,
      availabilityRules,
      descriptionRules,
      valid,
      validate,

      form,
      ...data,
    };
  },
};
</script>
    