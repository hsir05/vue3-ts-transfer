<template>
<Transfer :options="data" v-model:value="value"  @update:value="value = $event" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Transfer from './components/transfer.vue'
const data = ref([
    {
        label:"option1",
        value:"1"
    },
     {
        label:"option2",
        value:"2"
    },
     {
        label:"option3",
        value:"3"
    },
     {
        label:"option4",
        value:"4"
    },
])

const value = ref([])

</script>
