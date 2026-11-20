<script setup>
import PageHeading from '../components/PageHeading.vue'
</script>
<template>
  <PageHeading title="個人情報の取り扱い" eyebrow="PRIVACY" description="お問い合わせフォームのご利用について。" /><section class="section"><div class="container content-flow"><div><h2>お問い合わせ内容の送信について</h2><p>お問い合わせフォームの入力内容は、確認操作だけでは学校やサーバーに送信されません。「メールアプリで送信する」を選ぶと、お使いのメールアプリに宛先と入力内容が設定されます。内容をご確認のうえ、ご自身で送信してください。テキストとしての保存もご利用いただけます。</p></div><div><h2>正式公開時のご案内</h2><p>運営者の正式な個人情報保護方針、利用目的、お問い合わせ窓口を確認したうえで、このページを更新します。正式な送信機能は、その確認後に公開します。</p></div><RouterLink to="/contact/" class="text-link">お問い合わせページに戻る →</RouterLink></div></section>
</template>
