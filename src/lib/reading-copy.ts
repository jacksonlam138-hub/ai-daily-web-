export function sourceLabel(source: string, sourceUrl: string): string {
  if (source.trim() && source !== '其他') return source
  try { return new URL(sourceUrl).hostname.replace(/^www\./, '') || '原始来源' }
  catch { return '原始来源' }
}

function point(value: string) {
  const text = value.trim().replace(/[；;]+$/, '').trim()
  const labelled = text.match(/^([^：:\n]{1,12})[：:](?!\/\/)\s*([\s\S]+)$/)
  return labelled ? { title: labelled[1], text: labelled[2] } : { title: undefined, text }
}

export function splitPerspective(value: string) {
  const text = value.trim()
  // Match list markers, not decimal prices or model versions in archived copy.
  const markers = [...text.matchAll(/(?:^|(?<=[\s；;。：:]))(?:[（(]([1-9]\d?)[)）]|([1-9]\d?)[)）、]|([1-9]\d?)\.(?!\d))\s*/gu)]
  const first = markers[0]
  if (!first || !markers.every((marker, index) => Number(marker[1] ?? marker[2] ?? marker[3]) === index + 1)) {
    return { intro: '', points: text ? [point(text)] : [] }
  }
  return {
    intro: text.slice(0, first.index).trim(),
    points: markers.map((marker, index) => point(text.slice(marker.index + marker[0].length, markers[index + 1]?.index))).filter(item => item.text),
  }
}
