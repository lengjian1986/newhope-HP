<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHeading from '../components/PageHeading.vue'
import { assets, lifeGallery, navigation, communicationGallery } from '../data.js'
const route = useRoute()
const category = computed(() => route.meta.lifeCategory || 'art')
const categories = navigation.find(item => item.to === '/life/').children
const dailyPhotos = communicationGallery.filter(photo => photo.category === 'atmosphere')
const activityPhotos = communicationGallery.filter(photo => photo.category === 'activities')
const activities = [
  ['仲間と出会う', '日々の会話や交流を通して、国や文化を越えたつながりを育みます。'],
  ['一緒に体験する', '仲間とともに日本の文化や地域に触れ、教室の外にも学びを広げます。'],
  ['思い出をつくる', '一緒に過ごす時間を大切にしながら、日本での学校生活を豊かにしていきます。'],
]
</script>
<template>
  <PageHeading title="学校生活" eyebrow="LIFE AT NEW HOPE" description="学ぶ、感じる、つながる。ニューホープで過ごす毎日をご紹介します。" />
  <section class="section"><div class="container content-flow">
    <div><h2>日本語で、毎日が少しずつ<br class="mobile-only" />豊かになる。</h2><p>多様な国の仲間とともに過ごす時間。日々の会話や体験が、かけがえのない学びになります。</p></div>
    <nav class="life-categories" aria-label="学校生活のカテゴリー"><RouterLink v-for="item in categories" :key="item.to" :to="item.to" :aria-current="route.path === item.to ? 'page' : undefined"><span class="life-category-full">{{ item.label }}</span><span class="life-category-short">{{ item.to.includes('/art/') ? 'アート' : item.label }}</span></RouterLink></nav>
    <section v-if="category === 'art'" id="art" class="life-section" aria-labelledby="art-title"><p class="eyebrow">ART & CULTURE</p><h2 id="art-title">アート・文化体験</h2><p>書道やアートを通して、日本の文化に触れる。言葉だけでは伝えきれない思いも、自分らしく表現してみましょう。</p><img class="life-art" :src="assets.art" alt="書道とアートによる日本文化体験" width="1644" height="880" loading="lazy" /></section>
    <section v-else-if="category === 'atmosphere'" id="atmosphere" class="life-section" aria-labelledby="atmosphere-title"><p class="eyebrow">OUR CAMPUS</p><h2 id="atmosphere-title">校内の雰囲気</h2><p>毎日を過ごす教室から、皆さんを迎えるエントランスまで。学びの舞台となる校内をご案内します。</p><div class="life-gallery"><figure v-for="photo in lifeGallery" :key="photo.src"><a :href="photo.src" target="_blank" rel="noopener noreferrer" :aria-label="`${photo.caption}の画像を新しいタブで開く`"><img :src="photo.src" :alt="photo.caption" :width="photo.width" :height="photo.height" loading="lazy" /></a><figcaption>{{ photo.caption }}</figcaption></figure></div><div class="life-daily"><h3>学びの日常</h3><p>仲間と過ごす教室、自分の課題に向き合う時間。日々の学びの様子をご紹介します。</p><div class="life-gallery"><figure v-for="photo in dailyPhotos" :key="photo.src"><a :href="photo.src" target="_blank" rel="noopener noreferrer" :aria-label="`${photo.caption}の画像を新しいタブで開く`"><img :src="photo.src" :alt="photo.caption" :width="photo.width" :height="photo.height" :style="{ objectPosition: photo.position }" loading="lazy" /></a><figcaption>{{ photo.caption }}</figcaption></figure></div></div></section>
    <section v-else id="activities" class="life-section" aria-labelledby="activities-title"><p class="eyebrow">TOGETHER AT NEW HOPE</p><h2 id="activities-title">交流活動</h2><p>一緒に笑い、体験し、つながる。仲間との交流も、日本での大切な学びのひとつです。</p><div class="feature-grid"><article v-for="item in activities" :key="item[0]" class="feature-panel"><h3>{{ item[0] }}</h3><p>{{ item[1] }}</p></article></div><div class="life-activity-photos"><div class="life-gallery"><figure v-for="photo in activityPhotos" :key="photo.src"><a :href="photo.src" target="_blank" rel="noopener noreferrer" :aria-label="`${photo.caption}の画像を新しいタブで開く`"><img :src="photo.src" :alt="photo.caption" :width="photo.width" :height="photo.height" :style="{ objectPosition: photo.position }" loading="lazy" /></a><figcaption>{{ photo.caption }}</figcaption></figure></div></div></section>
  </div></section>
</template>
