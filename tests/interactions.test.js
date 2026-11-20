import { describe, test, expect, afterEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createSiteRouter } from '../src/router.js'
import SiteHeader from '../src/components/SiteHeader.vue'
import Home from '../src/pages/Home.vue'
import News from '../src/pages/News.vue'
import Contact from '../src/pages/Contact.vue'
import CourseDetail from '../src/pages/CourseDetail.vue'
import NewsDetail from '../src/pages/NewsDetail.vue'

const wrappers = []
async function setup(component, url = '/') {
  const router = createSiteRouter(true)
  await router.push(url)
  await router.isReady()
  const wrapper = mount(component, { global: { plugins: [router] }, attachTo: document.body })
  wrappers.push(wrapper)
  return { wrapper, router }
}
afterEach(() => { for (const wrapper of wrappers.splice(0)) wrapper.unmount(); vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

describe('navigation and homepage', () => {
  test('manual selection and returning to the tab each restart a full five-second interval', async () => {
    vi.useFakeTimers()
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(false)
    const { wrapper } = await setup(Home)
    await vi.advanceTimersByTimeAsync(4500)
    await wrapper.findAll('.slide-dots button')[1].trigger('click')
    await vi.advanceTimersByTimeAsync(4999)
    expect(wrapper.findAll('.slide-dots button')[1].attributes('aria-pressed')).toBe('true')
    await vi.advanceTimersByTimeAsync(1)
    expect(wrapper.findAll('.slide-dots button')[2].attributes('aria-pressed')).toBe('true')
    hidden.mockReturnValue(true)
    document.dispatchEvent(new Event('visibilitychange'))
    await vi.advanceTimersByTimeAsync(20000)
    expect(wrapper.findAll('.slide-dots button')[2].attributes('aria-pressed')).toBe('true')
    hidden.mockReturnValue(false)
    document.dispatchEvent(new Event('visibilitychange'))
    await vi.advanceTimersByTimeAsync(4999)
    expect(wrapper.findAll('.slide-dots button')[2].attributes('aria-pressed')).toBe('true')
    await vi.advanceTimersByTimeAsync(1)
    expect(wrapper.findAll('.slide-dots button')[0].attributes('aria-pressed')).toBe('true')
  })
  test('carousel advances every five seconds despite hover and focus, and cleans up on exit', async () => {
    vi.useFakeTimers()
    const { wrapper } = await setup(Home)
    const first = wrapper.get('.hero-photo picture.is-active img').attributes('src')
    await vi.advanceTimersByTimeAsync(4999)
    expect(wrapper.get('.hero-photo picture.is-active img').attributes('src')).toBe(first)
    await vi.advanceTimersByTimeAsync(1)
    expect(wrapper.findAll('.slide-dots button')[1].attributes('aria-pressed')).toBe('true')
    await vi.advanceTimersByTimeAsync(5000)
    expect(wrapper.findAll('.slide-dots button')[2].attributes('aria-pressed')).toBe('true')
    await vi.advanceTimersByTimeAsync(5000)
    expect(wrapper.get('.hero-photo picture.is-active img').attributes('src')).toBe(first)
    await wrapper.get('#hero').trigger('mouseenter')
    await wrapper.get('#hero').trigger('focusin')
    await vi.advanceTimersByTimeAsync(5000)
    expect(wrapper.findAll('.slide-dots button')[1].attributes('aria-pressed')).toBe('true')
    await vi.advanceTimersByTimeAsync(5000)
    expect(wrapper.findAll('.slide-dots button')[2].attributes('aria-pressed')).toBe('true')
    expect(wrapper.findAll('.hero-photo img')).toHaveLength(3)
    expect(wrapper.findAll('.hero-photo img').every(img => img.attributes('loading') === 'eager')).toBe(true)
    wrapper.unmount()
    expect(vi.getTimerCount()).toBe(0)
    wrappers.splice(wrappers.indexOf(wrapper), 1)
  })
  test('mobile menu opens, closes with Escape, and closes on navigation', async () => {
    const { wrapper, router } = await setup(SiteHeader)
    const toggle = wrapper.get('.menu-toggle')
    await toggle.trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('#mobile-navigation').exists()).toBe(true)
    expect(document.body.classList.contains('menu-open')).toBe(true)
    await wrapper.trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('#mobile-navigation').exists()).toBe(false)
    await toggle.trigger('click')
    await router.push('/about/#teachers')
    await nextTick()
    expect(wrapper.find('#mobile-navigation').exists()).toBe(false)
    expect(document.body.classList.contains('menu-open')).toBe(false)
  })

  test('carousel changes photograph and active position, then cycles back', async () => {
    const { wrapper } = await setup(Home)
    const first = wrapper.get('.hero-photo picture.is-active img').attributes('src')
    const next = wrapper.get('.hero-next')
    await next.trigger('click')
    expect(wrapper.get('.hero-photo picture.is-active img').attributes('src')).not.toBe(first)
    expect(wrapper.findAll('.slide-dots button')[1].attributes('aria-pressed')).toBe('true')
    await next.trigger('click')
    await next.trigger('click')
    expect(wrapper.get('.hero-photo picture.is-active img').attributes('src')).toBe(first)
  })
})

describe('course and news pages', () => {
  test('news pagination and category filters show the right articles', async () => {
    const { wrapper } = await setup(News, '/news/')
    expect(wrapper.findAll('.news-row')).toHaveLength(4)
    await wrapper.findAll('.pagination button')[1].trigger('click')
    expect(wrapper.findAll('.news-row')).toHaveLength(1)
    expect(wrapper.text()).toContain('学校見学についてのご案内')
    await wrapper.findAll('.news-filters button')[2].trigger('click')
    expect(wrapper.findAll('.news-row')).toHaveLength(2)
    expect(wrapper.text()).toContain('春の入学式を行いました')
    expect(wrapper.text()).toContain('日本文化体験・書道の授業')
    expect(wrapper.find('.pagination').exists()).toBe(false)
  })

  test('course details respond to route changes and unknown courses show 404', async () => {
    const { wrapper, router } = await setup(CourseDetail, '/courses/academic/')
    expect(wrapper.get('h1').text()).toBe('進学コース詳細')
    await router.push('/courses/culture/')
    await nextTick()
    expect(wrapper.get('h1').text()).toBe('短期・文化体験コース詳細')
    await router.push('/courses/missing/')
    await nextTick()
    expect(wrapper.text()).toContain('ページが見つかりません')
  })

  test('news detail resolves its article and adjacent links', async () => {
    const { wrapper, router } = await setup(NewsDetail, '/news/spring-ceremony/')
    expect(wrapper.get('.article-title').text()).toBe('春の入学式を行いました')
    expect(wrapper.find('.article-navigation a:last-child').attributes('href')).toBe('/news/admissions-consultation/')
    await router.push('/news/missing/')
    await nextTick()
    expect(wrapper.text()).toContain('ページが見つかりません')
  })
})

describe('inquiry form', () => {
  test('fields have validation rules and confirmation preserves user edits', async () => {
    const { wrapper } = await setup(Contact, '/contact/')
    expect(wrapper.get('.contact-methods a').attributes('href')).toBe('tel:0675026106')
    expect(wrapper.findAll('a[href^="mailto:"]')).toHaveLength(0)
    expect(wrapper.get('#inquiry-name').attributes()).toHaveProperty('required')
    expect(wrapper.get('#inquiry-email').attributes('type')).toBe('email')
    expect(wrapper.get('#inquiry-message').attributes()).toHaveProperty('required')
    expect(wrapper.get('.consent input').attributes()).toHaveProperty('required')
    await wrapper.get('#inquiry-name').setValue('テスト 花子')
    await wrapper.get('#inquiry-email').setValue('test@example.com')
    await wrapper.get('#inquiry-country').setValue('日本')
    await wrapper.get('#inquiry-message').setValue('学校見学について相談したいです。')
    await wrapper.get('.consent input').setValue(true)
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.get('.contact-summary').text()).toContain('テスト 花子')
    expect(wrapper.get('.contact-summary').text()).toContain('送信する')
    expect(wrapper.text()).not.toContain('内容を保存する')
    const edit = wrapper.findAll('button').find(button => button.text().includes('入力を修正する'))
    await edit.trigger('click')
    expect(wrapper.get('#inquiry-name').element.value).toBe('テスト 花子')
    expect(wrapper.get('#inquiry-message').element.value).toBe('学校見学について相談したいです。')
    expect(wrapper.find('[type="submit"]').text()).toContain('確認する')
  })
})

async function confirmedContact() {
  const { wrapper } = await setup(Contact, '/contact/')
  await wrapper.get('#inquiry-name').setValue('テスト 花子')
  await wrapper.get('#inquiry-email').setValue('test@example.com')
  await wrapper.get('#inquiry-message').setValue('入学について相談したいです。')
  await wrapper.get('.consent input').setValue(true)
  await wrapper.get('form').trigger('submit')
  await flushPromises()
  return wrapper
}

describe('direct website submission (mocked service, no real emails)', () => {
  test('posts once, disables duplicate submissions and shows acceptance only after success', async () => {
    let resolveRequest
    const request = vi.fn(() => new Promise(resolve => { resolveRequest = resolve }))
    vi.stubGlobal('fetch', request)
    const wrapper = await confirmedContact()
    const send = wrapper.get('.confirmation-actions .button-primary')
    await send.trigger('click')
    expect(send.attributes()).toHaveProperty('disabled')
    await send.trigger('click')
    expect(request).toHaveBeenCalledTimes(1)
    const [url, options] = request.mock.calls[0]
    expect(url).toBe('https://formsubmit.co/ajax/newhope.toukatsu@gmail.com')
    expect(options.method).toBe('POST')
    expect(JSON.parse(options.body)).toMatchObject({ name: 'テスト 花子', email: 'test@example.com', _replyto: 'test@example.com', message: '入学について相談したいです。' })
    expect(wrapper.find('.submission-result').exists()).toBe(false)
    resolveRequest({ ok: true, json: async () => ({ success: 'true' }) })
    await flushPromises()
    expect(wrapper.get('.submission-result').text()).toContain('お問い合わせを受け付けました')
  })

  test('network and service failures preserve input and allow retry', async () => {
    const request = vi.fn().mockRejectedValueOnce(new TypeError('offline')).mockResolvedValueOnce({ ok: true, json: async () => ({ success: false }) }).mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) })
    vi.stubGlobal('fetch', request)
    const wrapper = await confirmedContact()
    await wrapper.get('.confirmation-actions .button-primary').trigger('click')
    await flushPromises()
    expect(wrapper.get('[role=alert]').text()).toContain('入力内容は保持されています')
    expect(wrapper.get('.contact-summary').text()).toContain('テスト 花子')
    expect(wrapper.get('.confirmation-actions .button-primary').attributes('disabled')).toBeUndefined()
    await wrapper.get('.confirmation-actions .button-primary').trigger('click')
    await flushPromises()
    expect(wrapper.find('.submission-result').exists()).toBe(false)
    await wrapper.get('.confirmation-actions .button-primary').trigger('click')
    await flushPromises()
    expect(wrapper.get('.submission-result').text()).toContain('受け付けました')
  })

  test('activation required is not shown as a successfully delivered inquiry', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: false, message: 'This form needs activation' }) }))
    const wrapper = await confirmedContact()
    await wrapper.get('.confirmation-actions .button-primary').trigger('click')
    await flushPromises()
    expect(wrapper.get('.submission-result').text()).toContain('受信設定の確認が必要')
    expect(wrapper.get('.submission-result').text()).not.toContain('受け付けました')
  })
})
