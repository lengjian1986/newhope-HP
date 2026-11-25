<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X, ArrowUpRight } from 'lucide-vue-next'
import { navigation, assets } from '../data.js'

const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false })
watch(open, (value) => { if (typeof document !== 'undefined') document.body.classList.toggle('menu-open', value) })
onUnmounted(() => { if (typeof document !== 'undefined') document.body.classList.remove('menu-open') })
function closeOnEscape(event) { if (event.key === 'Escape') open.value = false }
</script>

<template>
  <header class="site-header" @keydown="closeOnEscape">
    <div class="header-inner">
      <RouterLink to="/" class="brand brand-with-logo" aria-label="ニューホープ日本語学校 ホーム" @click="open = false">
        <img class="brand-symbol" :src="assets.logo" alt="" width="1920" height="1920" /><span class="brand-copy"><span class="brand-jp">ニューホープ日本語学校</span>
        <span class="brand-en">New Hope language school</span></span>
      </RouterLink>
      <nav class="desktop-nav" aria-label="メインナビゲーション">
        <RouterLink v-for="item in navigation" :key="item.to" :to="item.to">{{ item.label }}</RouterLink>
      </nav>
      <RouterLink to="/contact/" class="header-contact">お問い合わせ <ArrowUpRight :size="14" /></RouterLink>
      <button class="menu-toggle" :aria-expanded="open" aria-controls="mobile-navigation" :aria-label="open ? 'メニューを閉じる' : 'メニューを開く'" @click="open = !open">
        <X v-if="open" :size="26" /><Menu v-else :size="26" />
      </button>
    </div>
    <nav v-if="open" id="mobile-navigation" class="mobile-nav" aria-label="モバイルナビゲーション">
      <RouterLink to="/">ホーム <span>→</span></RouterLink>
      <RouterLink v-for="item in navigation" :key="item.to" :to="item.to">{{ item.label }} <span>→</span></RouterLink>
      <RouterLink to="/about/#teachers">教師紹介 <span>→</span></RouterLink>
      <RouterLink to="/about/#access">アクセス <span>→</span></RouterLink>
      <RouterLink to="/contact/" class="button button-primary">お問い合わせ・資料請求 <ArrowUpRight :size="16" /></RouterLink>
    </nav>
  </header>
</template>
