export default async function run(page) {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.reload()
  return await page.evaluate(() => {
    const filter = document.querySelector('.task-filter')
    const firstCard = document.querySelector('.task-card')
    const panel = document.querySelector('#filtersPanel')
    return {
      filterFirst: filter && filter.compareDocumentPosition(firstCard) & Node.DOCUMENT_POSITION_FOLLOWING,
      cardWidth: firstCard ? Math.round(firstCard.getBoundingClientRect().width) : 0,
      containerWidth: Math.round(document.querySelector('.task-list-container').getBoundingClientRect().width),
      filterCollapsed: panel ? !panel.classList.contains('show') : false,
      overflow: document.documentElement.scrollWidth > window.innerWidth,
    }
  })
}
