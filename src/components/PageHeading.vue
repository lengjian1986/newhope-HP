<script setup>
defineProps({ title: String, eyebrow: String, description: String })
</script>
<template>
  <section class="page-heading">
    <div class="container">
      <nav aria-label="パンくずリスト" class="breadcrumb"><RouterLink to="/">HOME</RouterLink><span>/</span><span aria-current="page">{{ title }}</span></nav>
      <p class="eyebrow">{{ eyebrow }}</p><h1>{{ title }}</h1><p class="page-description">{{ description }}</p>
    </div>
  </section>
</template>
