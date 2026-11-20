<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SchoolBanner from './components/SchoolBanner.vue'
import SiteFooter from './components/SiteFooter.vue'

const route = useRoute()
watch(() => route.meta.title, (title) => {
  if (typeof document !== 'undefined') document.title = `${title}｜ニューホープ言語学校`
}, { immediate: true })
</script>

<template>
  <a class="skip-link" href="#main">本文へ移動する</a>
  <SiteHeader />
  <main id="main" tabindex="-1"><RouterView /></main>
  <SchoolBanner />
  <SiteFooter />
</template>
