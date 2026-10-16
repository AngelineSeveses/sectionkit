// Controlled vocabularies used by metadata, filters and search.
// Adding a value here makes it available as a filter option.

export const industries = [
  { id: 'saas', label: 'SaaS & technology' },
  { id: 'agency', label: 'Marketing & creative agencies' },
  { id: 'home-services', label: 'Home services & contractors' },
  { id: 'professional-services', label: 'Professional services' },
  { id: 'real-estate', label: 'Real estate & property' },
  { id: 'ecommerce', label: 'E-commerce & consumer' },
  { id: 'healthcare', label: 'Healthcare & wellness' },
  { id: 'education', label: 'Education & online learning' },
  { id: 'finance', label: 'Financial & business services' },
  { id: 'hospitality', label: 'Hospitality & travel' },
  { id: 'local-business', label: 'Local businesses' },
  { id: 'b2b', label: 'B2B services' },
]

export const goals = [
  { id: 'book-demo', label: 'Book a demo' },
  { id: 'free-trial', label: 'Start a free trial' },
  { id: 'sign-up', label: 'Sign up' },
  { id: 'request-quote', label: 'Request a quote' },
  { id: 'book-consultation', label: 'Book a consultation' },
  { id: 'book-appointment', label: 'Book an appointment' },
  { id: 'call-now', label: 'Call now' },
  { id: 'contact', label: 'Contact' },
  { id: 'purchase', label: 'Purchase' },
  { id: 'subscribe', label: 'Subscribe' },
  { id: 'download', label: 'Download a resource' },
  { id: 'learn-more', label: 'Learn more / explore' },
]

export const layouts = [
  { id: 'split', label: 'Split' },
  { id: 'centered', label: 'Centered' },
  { id: 'full-bleed', label: 'Full-bleed' },
  { id: 'grid', label: 'Grid' },
  { id: 'bento', label: 'Bento' },
  { id: 'list', label: 'List' },
  { id: 'stacked', label: 'Stacked rows' },
  { id: 'table', label: 'Table' },
  { id: 'band', label: 'Band / strip' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'masonry', label: 'Masonry' },
]

export const styles = [
  { id: 'minimal', label: 'Minimal' },
  { id: 'professional', label: 'Professional' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'bold', label: 'Bold' },
  { id: 'warm', label: 'Warm' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'technical', label: 'Technical' },
  { id: 'friendly', label: 'Friendly' },
  { id: 'dark', label: 'Dark' },
]

export const markets = [
  { id: 'US', label: 'United States' },
  { id: 'CA', label: 'Canada' },
]

// Design attributes that genuinely vary between sections.
export const traits = [
  { id: 'form', label: 'Contains a form' },
  { id: 'photography', label: 'Uses photography' },
  { id: 'dark-background', label: 'Dark background' },
  { id: 'css-interactive', label: 'Interactive (no JS)' },
  { id: 'sample-data', label: 'Sample reviews or figures' },
]

export const filterGroups = [
  { key: 'industries', param: 'ind', label: 'Industry', options: industries },
  { key: 'goals', param: 'goal', label: 'Conversion goal', options: goals },
  { key: 'layout', param: 'layout', label: 'Layout', options: layouts },
  { key: 'styles', param: 'style', label: 'Visual style', options: styles },
  { key: 'markets', param: 'market', label: 'Market', options: markets },
  { key: 'traits', param: 'has', label: 'Contains', options: traits },
]

const allLists = { industries, goals, layouts, styles, markets, traits }

export function labelFor(listName, id) {
  return allLists[listName]?.find((o) => o.id === id)?.label ?? id
}
