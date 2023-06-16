<template>
  <div class="d-flex align-content-start flex-wrap">
    <v-card
      v-for="(product, index) in products"
      :key="index"
      :loading="loading"
      class="mx-5 my-12"
      max-width="320"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
      <img cover height="250" src="@/assets/img/products/product.jpg"/>

      <v-card-item>
        <v-card-title>{{ product.product_title }}</v-card-title>
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

        <div class="my-4 text-subtitle-1">$ {{  product.product_name }}</div>

        <div>
          {{ product.product_description }}
        </div>
      </v-card-text>

      <v-divider class="mx-4 mb-1"></v-divider>

      <v-card-title>Availability</v-card-title>

      <div class="px-4">
        <v-chip-group v-model="selection">
          <v-chip v-for="(product, index) in product.product_availability"
      :key="index" >{{ product }}</v-chip>
        </v-chip-group>
      </div>

      <v-card-actions>
        <v-btn small color="primary" @click="editItem(product)" >
            <v-icon left>mdi-pencil</v-icon>

        </v-btn>
        <v-btn small color="error" @click="deleteItem(product.id)" >
            <v-icon left>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">User Product</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="product_title" label="title*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="product_name"
                  label="Product Name"
                  hint=""
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                    v-model="product_availability"
                    :items="states"
                    label="State"
                    multiple
                    chips
                    small-chips
                    outlined
                    dense
                  ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="product_description"
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
          <v-btn color="blue-darken-1" variant="text" @click="updateProdcut">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
  <script>
import { useUserStore } from "../../stores/user";
import { productStore } from "../../stores/product";
import { ref, computed } from "vue";

export default {
  data: () => ({
    loading: false,
    selection: 1,
  }),

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
  setup() {
    const userStore = useUserStore();
    const productStr = productStore();
    const dialog = ref(false)
    const product_title = ref('')
    const product_name = ref('')
    const product_availability = ref([]);
    const product_description = ref('')
    const product_id = ref('')

   const  deleteItem = (id) => {
    productStr.deleteItem(id, userStore.user.id);
   }
   const editItem = (product) => {
    product_title.value = product.product_title
    product_name.value = product.product_name
    product_availability.value = product.product_availability
    product_description.value = product.product_description
    product_id.value = product.id
    dialog.value = true
        
   }
   const updateProdcut = () => {
    const updateProdcut = {
        product_title: product_title.value,
        product_name: product_name.value,
        product_availability: product_availability.value,
        product_description: product_description.value,
        id:product_id.value,
        user_id:userStore.user.id
    }
    productStr.updateProdcut(updateProdcut);
    dialog.value = false
   }
    const products = computed(() => productStr.products);
    const productImage = ref('');
    return {
      products,
      deleteItem,
      editItem,
      dialog,
      product_title,
      product_name,
      product_availability,
      product_description,
      product_id,
      updateProdcut,
      productImage
    };
  },
};
</script>