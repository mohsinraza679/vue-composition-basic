<template>
    <h1>Users {{ users }}</h1>
</template>
<script setup>
import { mapState, mapActions, mapStores } from 'pinia';
import { useUserStore } from '../stores/user'
const userStore = useUserStore();
const users = mapState(userStore, ['users']);
// export default defineComponent({
//     computed:{
//         ...mapState(useUserStore, ['users'])
//     }
// })
</script>