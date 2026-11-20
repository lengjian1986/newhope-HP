<script setup>
import { assets } from '../data.js'
</script>
<template>
  <section id="atmosphere" class="section pale-section">
    <div class="container">
      <p class="eyebrow">LEARNING TOGETHER</p><h2>学び合う教室に、<br class="mobile-only" />笑顔が集まる。</h2>
      <p class="section-intro">話して、考えて、伝え合う。先生と仲間に囲まれて、日本語を使う自信を育てます。</p>
      <div class="atmosphere-layout"><img :src="assets.classroom" alt="仲間と学び合う教室のイメージ" class="classroom-image" loading="lazy" width="1360" height="800" />
        <div class="atmosphere-features">
          <div><h3>声が届く、少人数の学び</h3><p>質問しやすく、一人ひとりのペースに寄り添う授業。</p></div>
          <div><h3>会話から広がる日本語</h3><p>ペアワークや発表を通して、伝える力を磨きます。</p></div>
          <div><h3>違いを楽しむ、仲間との時間</h3><p>さまざまな文化に触れ、新しい視点に出会います。</p></div>
        </div>
      </div>
      <p class="image-note">※ 写真は学習風景のイメージです。実際の授業写真に差し替え予定。</p>
    </div>
  </section>
</template>
