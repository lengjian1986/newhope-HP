<script setup>
import { ArrowRight, ArrowUp } from 'lucide-vue-next'
import { navigation, school } from '../data.js'
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-heading">
        <RouterLink to="/" class="brand footer-brand"><span class="brand-jp">ニューホープ言語学校</span><span class="brand-en">New Hope language school</span></RouterLink>
        <a class="back-to-top" href="#main" aria-label="ページの先頭へ"><ArrowUp :size="19" /></a>
      </div>
      <address class="footer-address"><span>{{ school.address }}</span><a :href="school.phoneHref">TEL {{ school.phone }}</a><a :href="`mailto:${school.email}`">{{ school.email }}</a></address>
      <nav aria-label="フッターナビゲーション" class="footer-nav">
        <RouterLink v-for="item in navigation" :key="item.to" :to="item.to">{{ item.label }}</RouterLink>
        <RouterLink to="/about/#teachers">教師紹介</RouterLink><RouterLink to="/about/#access">アクセス</RouterLink>
      </nav>
      <RouterLink class="button button-primary footer-cta" to="/contact/">お問い合わせ・資料請求 <ArrowRight :size="16" /></RouterLink>
      <div class="footer-bottom"><RouterLink to="/privacy/">プライバシーポリシー</RouterLink><small>© New Hope language school</small></div>
    </div>
  </footer>
</template>
