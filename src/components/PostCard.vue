<template>
  <article class="border border-red-500 p-4 mb-4">
    <h2 class="text-xl font-bold" v-html="post.title.rendered"></h2>
    <p v-html="post.excerpt.rendered"></p>
  </article>
</template>

<script setup>
defineProps({
  post: Object
})
</script>
