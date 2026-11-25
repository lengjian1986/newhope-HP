<script setup>
import { ArrowRight } from 'lucide-vue-next'
import { assets } from '../data.js'
</script>

<template>
  <aside id="school-banner" class="school-banner" aria-label="学校紹介">
    <img class="skyline" :src="assets.skyline" alt="大阪の街並みと緑" loading="lazy" width="2172" height="724" />
    <div class="banner-content">
      <h2>ニューホープ日本語学校について</h2>
      <p>大阪から広がる、新しい未来。<br />多様な仲間と学び、夢への一歩を。</p>
      <RouterLink to="/about/" class="button button-primary">私たちの学校を知る <ArrowRight :size="16" /></RouterLink>
    </div>
  </aside>
</template>
