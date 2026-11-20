<script setup>
import { ref, computed, watch } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import PageHeading from '../components/PageHeading.vue'
import { news } from '../data.js'
const categories = ['すべて', '学校からのお知らせ', '学校行事', '入学情報']
const category = ref('すべて')
const currentPage = ref(1)
const pageSize = 4
const filtered = computed(() => news.filter(item => category.value === 'すべて' || item.category === category.value))
const pageCount = computed(() => Math.ceil(filtered.value.length / pageSize))
const visible = computed(() => filtered.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize))
watch(category, () => { currentPage.value = 1 })
</script>
<template>
  <PageHeading title="お知らせ" eyebrow="NEWS & EVENTS" description="学校の日々や、入学に関する最新情報をお届けします。" /><section class="section"><div class="container"><div class="news-filters" aria-label="お知らせのカテゴリー"><button v-for="item in categories" :key="item" :class="{ selected: category === item }" :aria-pressed="category === item" @click="category = item">{{ item }}</button></div><div class="news-list" aria-live="polite"><RouterLink v-for="item in visible" :key="item.slug" :to="`/news/${item.slug}/`" class="news-row"><span class="news-meta"><time :datetime="item.date.replaceAll('.', '-')">{{ item.date }}</time><span>/　{{ item.category }}</span></span><span class="news-row-title">{{ item.title }}<ArrowRight :size="20" /></span></RouterLink></div><nav v-if="pageCount > 1" class="pagination" aria-label="お知らせ一覧のページ"><button v-for="page in pageCount" :key="page" :class="{ selected: page === currentPage }" :aria-current="page === currentPage ? 'page' : undefined" @click="currentPage = page">{{ page }}</button><button :disabled="currentPage === pageCount" @click="currentPage++">次へ <ArrowRight :size="16" /></button></nav><p class="image-note">※ 掲載内容はデザイン確認用のサンプルです。</p></div></section>
</template>
