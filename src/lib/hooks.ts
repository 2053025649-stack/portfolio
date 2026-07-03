import { useEffect, useCallback } from 'react'

/**
 * Locks body scroll when a modal/overlay is open.
 * Automatically restores on unmount.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [locked])
}

/**
 * Keyboard shortcut for Escape key.
 */
export function useEscapeKey(onEscape: () => void, enabled = true) {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape()
    },
    [onEscape],
  )

  useEffect(() => {
    if (!enabled) return
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [enabled, handler])
}
