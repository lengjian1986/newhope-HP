<script setup>
import PageHeading from '../components/PageHeading.vue'
</script>
<template>
  <PageHeading title="個人情報の取り扱い" eyebrow="PRIVACY" description="お問い合わせフォームのご利用について。" /><section class="section"><div class="container content-flow"><div><h2>お問い合わせ内容の送信について</h2><p>お問い合わせフォームでは、お名前、メールアドレス、国・地域、お問い合わせ種別と内容をお預かりします。確認画面で「送信する」を押すと、外部フォーム配信サービス FormSubmit を通じて学校のメールアドレスへ送信されます。確認画面を表示しただけでは送信されません。お預かりした情報は、お問い合わせへの回答と必要な連絡のために利用します。</p></div><div><h2>正式公開時のご案内</h2><p>運営者の正式な個人情報保護方針、利用目的、お問い合わせ窓口を確認したうえで、このページを更新します。外部配信サービスでの取り扱いについては、<a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noopener noreferrer" class="text-link">FormSubmit のプライバシーポリシー</a>をご確認ください。</p></div><RouterLink to="/contact/" class="text-link">お問い合わせページに戻る →</RouterLink></div></section>
</template>
