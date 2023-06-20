<template>
  <v-card class="mx-auto my-2">
    <v-img cover height="400" :src="productImages"></v-img>

    <!-- <img cover  src="@/assets/img/products/product.jpg" /> -->

    <v-card-item>
<v-card-title>  {{ productdata.product_title }}</v-card-title>
    </v-card-item>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :model-value="4.5"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
        ></v-rating>

        <div class="text-grey ms-4">4.5 (413)</div>
      </v-row>

      <div class="my-4 text-subtitle-1">{{ productdata.product_name }}</div>

      <div>
       {{ productdata.product_description }}
      </div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>Availability</v-card-title>

    <div class="px-4">
      <v-chip-group>
        <v-chip
            v-for="(product, index) in productdata.product_availability"
            :key="index"
            >{{ product }}</v-chip
          >
      </v-chip-group>
    </div>

    <v-card-actions>
      <div class="action-main">
        <div class="action-main-btn">
          <v-btn small color="primary" @click="editItem(productdata)">
            <v-icon left>mdi-pencil</v-icon>
            <!-- Edit -->
          </v-btn>
          <v-btn small color="error" @click="deleteItem(productdata)">
            <v-icon left>mdi-delete</v-icon>
            <!-- Delete -->
          </v-btn>
        </div>
      </div>
    </v-card-actions>
  </v-card>
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
                    label="title*"
                    required
                    :rules="titleRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    v-model="product_name"
                    label="Product Name"
                    hint=""
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
                    clear-icon="mdi-close-circle"
                    label="Product Description"
                    :rules="descriptionRules"
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
            <v-btn color="blue-darken-1" variant="text" @click="updateProdcut">
              Update
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
  <v-row justify="center">
    <v-dialog v-model="deleteDialog" persistent max-width="500"  >
      <v-card height="200" class="pa-5">
        <v-card-title class="text-h5">
          Delete This {{ productdata.product_title }}?
        </v-card-title>
        <v-card-text>This is permanent and can't be undone</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            style="color: green;"
            color="  text-capitalize"
            text
            @click="deleteDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            style="color: red;"
            color="  text-capitalize"
            text
            @click="deleteItemProduct(productdata.id)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
  <script>
import productImage from "@/assets/img/products/product.jpg";
import { useRoute } from "vue-router";
import { useUserStore } from "../../stores/user";
import { computed, ref, watchEffect, reactive } from "vue";
import { productStore } from "../../stores/product";
export default {
  setup() {
    const productImages = ref(productImage);
    const userStore = useUserStore();
    const productStr = productStore();
    const route = useRoute();
    const params = reactive(route.params);
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
    watchEffect(() => {
        console.log(params.id);
      productStr.getProductDetail(params.id);
    });

    const  productdata = computed(()=> productStr.productDetail)
    const dialog = ref(false);
    const deleteDialog = ref(false);
    const product_title = ref("");
    const product_name = ref("");
    const product_availability = ref(null);
    const product_description = ref("");
    const product_id = ref("");
    const product = ref({});
    const deleteItem = (data) => {
      product.value = data;
      deleteDialog.value = true;
    };
    const deleteItemProduct = (id) => {
      productStr.deleteItem(id, userStore.user.id);
      deleteDialog.value = false;
    };
    const editItem = (product) => {
      product_title.value = product.product_title;
      product_name.value = product.product_name;
      product_availability.value = product.product_availability;
      product_description.value = product.product_description;
      product_id.value = product.id;
      dialog.value = true;
    };
    const updateProdcut = () => {
      const updateProdcut = {
        product_title: product_title.value,
        product_name: product_name.value,
        product_availability: product_availability.value,
        product_description: product_description.value,
        id: product_id.value,
        user_id: userStore.user.id,
      };
      if (
        product_title.value &&
        product_name.value &&
        product_availability.value.length > 0 &&
        product_description.value
      ) {
        productStr.updateProdcut(updateProdcut);
        dialog.value = false;
      } else {
        if (!product_availability.value.length) {
          product_availability.value = null;
        }
        validate();
      }
    };
    const form = ref(null);
    const validate = () => {
      console.log("data", product_availability.value);
      form.value.validate();
    };
    return {
      productImages,
      productdata,
      dialog,
      deleteItem,
      deleteItemProduct,
      editItem,
      product_title,
      product_name,
      product_availability,
      product_description,
      product_id,
      updateProdcut,
      productImage,
      form,
      deleteDialog,
      validate,
      ...data,
    };
  },
};
</script>