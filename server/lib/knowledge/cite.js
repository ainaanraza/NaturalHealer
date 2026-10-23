// The sources an answer actually cited, from its [n] markers, keeping the numbers the
// model saw so the markers in the text and the source list line up.
export function citedSources(answer, passages) {
  const cited = new Set([...String(answer).matchAll(/\[(\d{1,2})\]/g)].map(m => Number(m[1])))
  return passages
    .map((c, i) => ({ n: i + 1, title: c.title, url: c.url, kind: c.kind, section: c.section, review: c.review }))
    .filter(s => cited.has(s.n))
}
