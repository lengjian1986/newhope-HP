import { test, expect } from '@playwright/test'

const routes = ['/', '/about/', '/courses/', '/courses/academic/', '/courses/general/', '/courses/culture/', '/admissions/', '/life/', '/news/', '/news/spring-ceremony/', '/news/admissions-consultation/', '/news/calligraphy/', '/news/student-art/', '/news/school-visit/', '/contact/', '/privacy/']

for (const width of [390, 1440]) {
  test(`all pages render at ${width}px without overflow or broken images`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    for (const route of routes) {
      const response = await page.goto(route)
      expect(response.status(), route).toBe(200)
      await expect(page.locator('h1')).toBeVisible()
      expect(await page.locator('h1').textContent()).not.toContain('見つかりません')
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true)
      await page.locator('#school-banner').scrollIntoViewIfNeeded()
      await expect(page.locator('#school-banner img')).toBeVisible()
      const images = page.locator('img:visible')
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded()
        await expect(image, `${route}: ${await image.getAttribute('src')}`).toHaveJSProperty('complete', true)
        expect(await image.evaluate(img => img.naturalWidth)).toBeGreaterThan(0)
      }
    }
    expect(errors).toEqual([])
  })
}

test('mobile menu, teacher anchor and photo carousel work', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'メニューを開く' }).click()
  await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'true')
  await page.locator('#mobile-navigation').getByRole('link', { name: '教師紹介' }).click()
  await expect(page).toHaveURL(/about\/#teachers/)
  await expect(page.locator('#teachers')).toBeInViewport()
  await expect(page.locator('#mobile-navigation')).toHaveCount(0)
  await page.goto('/')
  const before = await page.locator('.hero-photo picture.is-active img').getAttribute('src')
  await page.getByRole('button', { name: '次の写真を見る' }).click()
  await expect(page.locator('.hero-photo picture.is-active img')).not.toHaveAttribute('src', before)
  await expect(page.locator('.slide-dots button').nth(1)).toHaveAttribute('aria-pressed', 'true')
})

test('news categories, pagination and detail navigation work', async ({ page }) => {
  await page.goto('/news/')
  await expect(page.locator('.news-row')).toHaveCount(4)
  await page.getByRole('button', { name: '2', exact: true }).click()
  await expect(page.locator('.news-row')).toHaveCount(1)
  await page.getByRole('button', { name: '学校行事', exact: true }).click()
  await expect(page.locator('.news-row')).toHaveCount(2)
  await page.getByRole('link', { name: /春の入学式を行いました/ }).click()
  await expect(page).toHaveURL(/news\/spring-ceremony\//)
  await expect(page.locator('.article-title')).toHaveText('春の入学式を行いました')
  await page.getByRole('link', { name: '次のお知らせ' }).click()
  await expect(page.locator('.article-title')).toHaveText('新年度の入学相談を受け付けています')
})

test('contact form validates and submits on the website without opening email', async ({ page }) => {
  await page.goto('/contact/')
  await page.getByRole('button', { name: '入力内容を確認する' }).click()
  await expect(page.locator('.contact-summary')).toHaveCount(0)
  await page.getByLabel('お名前').fill('テスト 花子')
  await page.getByLabel('メールアドレス').fill('test@example.com')
  await page.getByLabel('国・地域').fill('日本')
  await page.getByLabel('お問い合わせ内容', { exact: false }).fill('学校見学について相談したいです。')
  await page.locator('.consent input').check()
  await page.getByRole('button', { name: '入力内容を確認する' }).click()
  await expect(page.locator('.contact-summary')).toContainText('テスト 花子')
  await expect(page.locator('.contact-summary')).toContainText('送信する')
  await page.getByRole('button', { name: '入力を修正する' }).click()
  await expect(page.getByLabel('お名前')).toHaveValue('テスト 花子')
  await page.getByRole('button', { name: '入力内容を確認する' }).click()
  await page.route('https://formsubmit.co/ajax/**', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: 'true' }) }))
  await page.getByRole('button', { name: '送信する', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('お問い合わせを受け付けました')
})

test('tablet and compact phone remain usable and captures match the layout', async ({ page }) => {
  for (const width of [320, 375, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: 'artifacts/home-mobile.png', fullPage: true })
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/')
  await page.screenshot({ path: 'artifacts/home-desktop.png', fullPage: true })
})
