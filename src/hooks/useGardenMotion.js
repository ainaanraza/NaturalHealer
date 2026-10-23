import { useEffect } from 'react'

// Reveal every [data-reveal] inside `rootRef` once it scrolls into view
export function useReveal(rootRef, deps = []) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const items = root.querySelectorAll('[data-reveal]:not(.is-seen)')
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-seen'))
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-seen')
          io.unobserve(entry.target)
        }
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })
    items.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}

// Write scroll progress through the hero into --py (0 at top, 1 one screen down)
export function useParallax(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const progress = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1.2)
      el.style.setProperty('--py', progress.toFixed(4))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref])
}
