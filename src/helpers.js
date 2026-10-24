import { useEffect } from 'react'

// Ask the image CDN for a smaller copy when a small picture is enough
export function sizedImage(url, width) {
  if (!url || !url.includes('images.pexels.com')) return url
  return url.replace(/([?&])w=\d+/, `$1w=${width}`)
}

// Sets the browser tab title for each page
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Kaarigar` : 'Kaarigar | Handmade in Pakistan'
  }, [title])
}
