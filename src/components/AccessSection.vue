<script setup>
import { ArrowRight } from 'lucide-vue-next'
import { assets, school } from '../data.js'
const steps = [
  ['最寄り駅の出口', '［正式な出口番号と進行方向を掲載予定］'],
  ['駅前から学校のある通りへ', '［交差点・路辺の目印と道順を掲載予定］'],
  ['学校の入口に到着', '［建物名・入口・受付の場所を掲載予定］'],
]
</script>
<template>
  <section id="access" class="section pale-section">
    <div class="container"><p class="eyebrow">ACCESS</p><h2>学校までの道のり</h2><p class="section-intro">はじめての方にも、安心してお越しいただけるように。最寄り駅から学校までの道順をご案内します。</p>
      <div class="access-information"><div><h3>{{ school.name }}</h3><p class="school-english-name">{{ school.englishName }}</p><dl class="access-address"><div><dt>所在地</dt><dd>{{ school.address }}</dd></div><div v-for="station in school.stations" :key="station.station"><dt>{{ station.walk }}</dt><dd>{{ station.line }}「{{ station.station }}」</dd></div><div><dt>TEL</dt><dd><a :href="school.phoneHref">{{ school.phone }}</a></dd></div><div><dt>Email</dt><dd><a :href="`mailto:${school.email}`">{{ school.email }}</a></dd></div></dl><a :href="school.mapUrl" target="_blank" rel="noopener noreferrer" class="text-link access-map-link">Google マップで確認する ↗</a></div>
        <aside class="visit-note"><h3>見学をご希望の方へ</h3><p>学校見学は事前のご予約をお願いいたします。道に迷われた際は、学校までご連絡ください。</p><RouterLink to="/contact/" class="text-link">見学の相談・お問い合わせ <ArrowRight :size="16" /></RouterLink></aside>
      </div>
      <h3 class="route-heading">駅から学校まで｜写真で見るアクセス</h3>
      <div class="route-grid"><article v-for="(step, i) in steps" :key="step[0]"><img :src="assets.route[i]" :alt="`${step[0]}の示意写真（実際の経路ではありません）`" loading="lazy" width="792" height="500" /><h4><span>{{ String(i + 1).padStart(2, '0') }}</span>{{ step[0] }}</h4><p>{{ step[1] }}</p></article></div>
      <p class="image-note">※ 沿道写真は街景のイメージ素材です。実際の駅出口・曲がり角・学校入口の写真に差し替え予定。</p>
    </div>
  </section>
</template>
