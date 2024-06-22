<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { log } from 'util'

let js_error = ref<any>([])
let isError = ref(false)

onMounted(() => {
  try {
    let jsErrorList = localStorage.getItem('jsErrorList')
    if (jsErrorList) {
      isError.value = true
      js_error.value = JSON.parse(jsErrorList)
    }
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div v-if="isError">
    <pre>
      {{ js_error.stack }}
    </pre>
  </div>
</template>
