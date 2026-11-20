<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowRight, BookOpen, GraduationCap, Users, ChevronRight } from 'lucide-vue-next'
import { assets, news, teachers } from '../data.js'

const activeSlide = ref(0)
const slides = [
  { src: assets.hero, mobile: assets.heroMobile, alt: '日本語を学ぶ仲間たち' },
  { src: assets.classroom, alt: '仲間と学び合う教室' },
  { src: assets.art, alt: 'アートと日本語の体験' },
]
let slideTimer
function startTimer() {
  clearTimeout(slideTimer)
  if (document.hidden) return
  slideTimer = setTimeout(() => {
    activeSlide.value = (activeSlide.value + 1) % slides.length
    startTimer()
  }, 5000)
}
function selectSlide(index) {
  activeSlide.value = index
  startTimer()
}
onMounted(() => {
  startTimer()
  document.addEventListener('visibilitychange', startTimer)
})
onUnmounted(() => {
  clearTimeout(slideTimer)
  document.removeEventListener('visibilitychange', startTimer)
})
const quickLinks = [
  { to: '/about/', title: '学校案内', icon: GraduationCap, description: '新しい出会いと学びがある場所。\n学校の特徴や施設をご紹介します。', short: '学校の特徴・施設について' },
  { to: '/courses/', title: '学習コース', icon: BookOpen, description: '目標に合わせて選べるコース。\n進学から日常会話までサポート。', short: '目標に合わせた日本語の学び' },
  { to: '/admissions/', title: '入学案内', icon: Users, description: 'あなたの一歩を応援します。\n出願から入学までの流れをご案内。', short: '出願から入学までをサポート' },
]
</script>

<template>
  <section id="hero" class="home-hero" aria-roledescription="カルーセル" aria-label="学校の紹介">
    <div class="hero-inner">
      <div class="hero-copy"><h1>大阪で、<br />日本語の新しい一歩を。</h1><p>日本語を学び、未来へつなぐ。<br />一人ひとりの夢に寄り添う、日本語学校です。</p></div>
      <div class="hero-photo">
        <picture v-for="(slide, i) in slides" v-show="activeSlide === i" :key="slide.src" :class="{ 'is-active': activeSlide === i }"><source v-if="slide.mobile" media="(max-width: 767px)" :srcset="slide.mobile" /><img :src="slide.src" :alt="slide.alt" :fetchpriority="i === 0 ? 'high' : 'auto'" loading="eager" width="1700" height="1200" /></picture>
        <button class="hero-next" aria-label="次の写真を見る" @click="selectSlide((activeSlide + 1) % slides.length)"><ChevronRight :size="21" /></button>
      </div>
      <div class="hero-actions"><RouterLink to="/about/" class="button button-primary">学校について <ArrowRight :size="16" /></RouterLink><RouterLink to="/courses/" class="button button-outline"><span class="desktop-label">学習コースを見る</span><span class="mobile-label">コースを見る</span><ArrowRight :size="16" /></RouterLink></div>
      <div class="slide-dots" aria-label="写真を選ぶ"><button v-for="(slide, i) in slides" :key="slide.src" :class="{ active: activeSlide === i }" :aria-label="`写真 ${i + 1}：${slide.alt}`" :aria-pressed="activeSlide === i" @click="selectSlide(i)"></button></div>
    </div>
  </section>

  <section id="quick-links" class="quick-links container" aria-label="学校のご案内">
    <RouterLink v-for="link in quickLinks" :key="link.to" :to="link.to" class="quick-link">
      <component :is="link.icon" class="quick-icon" :size="40" :stroke-width="1.3" /><div class="quick-copy"><h2>{{ link.title }}<ArrowRight :size="20" /></h2><p class="desktop-description">{{ link.description }}</p><p class="mobile-description">{{ link.short }}</p><span class="quick-more">詳しく見る <ArrowRight :size="14" /></span></div><ArrowRight class="quick-mobile-arrow" :size="18" />
    </RouterLink>
  </section>

  <section id="art" class="home-art container">
    <div class="art-copy"><p class="eyebrow">LEARN & CREATE</p><h2>アート×日本語</h2><h3>言葉と創作の楽しさに、<br />新しい自分を見つける。</h3><p class="art-description">日本の文化に触れながら、表現する力を育みます。<br />教室を飛び出して、体験から学ぶ日本語。</p><RouterLink to="/life/" class="button button-outline art-link">アートのある学びを見る <ArrowRight :size="16" /></RouterLink></div>
    <img :src="assets.art" alt="書道や創作を通して学ぶアートと日本語" width="1644" height="880" loading="lazy" class="art-image" />
  </section>

  <section id="explore" class="home-explore pale-section"><div class="container"><h2>NEW HOPEで学ぶ、ということ。</h2><div class="explore-grid">
    <article><h3>教学の雰囲気</h3><p>笑顔で学び合う教室の日々。</p><RouterLink to="/about/#atmosphere" class="text-link">授業の様子を見る <ArrowRight :size="16" /></RouterLink></article>
    <article><h3>先生たちの紹介</h3><p>あなたの目標に寄り添う先生たち。</p><RouterLink to="/about/#teachers" class="text-link">写真とプロフィールを見る <ArrowRight :size="16" /></RouterLink></article>
    <article><h3>アクセス</h3><p>最寄り駅から学校までの道のり。</p><RouterLink to="/about/#access" class="text-link">写真付きのアクセス案内を見る <ArrowRight :size="16" /></RouterLink></article>
  </div></div></section>

  <section id="home-atmosphere" class="mobile-home-section pale-section"><div class="container"><p class="eyebrow">LEARNING TOGETHER</p><h2>学び合う教室に、<br />笑顔が集まる。</h2><img :src="assets.classroom" alt="笑顔で学び合う教室のイメージ" width="1360" height="800" loading="lazy" /><p>話して、考えて、伝え合う。<br />先生と仲間と一緒に、使える日本語を。</p><RouterLink to="/about/#atmosphere" class="button button-outline">授業の様子を見る <ArrowRight :size="16" /></RouterLink></div></section>

  <section id="home-teachers" class="mobile-home-section"><div class="container"><p class="eyebrow">OUR TEACHERS</p><h2>あなたに寄り添う、<br />先生たち。</h2><p>学習も、進路も、毎日の小さな相談も。<br />一人ひとりの挑戦を支えます。</p><div class="teacher-preview"><img v-for="(teacher, i) in teachers" :key="teacher.role" :src="assets.teachers[i]" :alt="`${teacher.role}のイメージ（AI生成）`" loading="lazy" width="786" height="620" /></div><p class="teacher-preview-labels">日本語担当　 /　 進学指導　 /　 文化体験</p><RouterLink to="/about/#teachers" class="button button-outline">先生の写真・プロフィールを見る <ArrowRight :size="16" /></RouterLink><p class="image-note">※ 肖像はAI生成のイメージです。</p></div></section>

  <section id="home-access" class="mobile-home-section pale-section"><div class="container"><p class="eyebrow">ACCESS</p><h2>学校までの道のり</h2><img :src="assets.route[1]" alt="沿道の街景イメージ" width="792" height="500" loading="lazy" /><h3>最寄り駅から、写真でご案内。</h3><p>駅の出口、曲がり角、学校の入口。<br />写真付きの道順で、初めてでも安心。</p><RouterLink to="/about/#access" class="button button-outline">写真付きアクセス案内を見る <ArrowRight :size="16" /></RouterLink><p class="image-note">阪堺線「聖天坂駅」徒歩1分。※ 写真はイメージです。</p></div></section>

  <section id="home-news" class="section home-news"><div class="container"><p class="eyebrow mobile-only">NEWS & EVENTS</p><h2>お知らせ</h2><div class="home-news-list"><RouterLink v-for="item in news.slice(0, 3)" :key="item.slug" :to="`/news/${item.slug}/`"><span class="news-meta"><time :datetime="item.date.replaceAll('.', '-')">{{ item.date }}</time><span>学校からのお知らせ</span></span><span class="news-title">{{ item.title }}</span><ArrowRight :size="18" /></RouterLink></div><RouterLink to="/news/" class="button button-outline news-all">お知らせ一覧へ <ArrowRight :size="16" /></RouterLink></div></section>
</template>
