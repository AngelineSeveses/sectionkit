// Category inventory. `target` is the long-term content goal, not a claim
// about what exists; implemented counts are computed from the registry.

export const categories = [
  { id: 'navigation', label: 'Navigation & headers', target: 25, description: 'Top bars that set expectations, carry the primary action, and stay out of the way.' },
  { id: 'hero', label: 'Hero sections', target: 50, description: 'The first screen: what you offer, who it is for, and the one action to take next.' },
  { id: 'logos', label: 'Logo bars & trust badges', target: 15, description: 'Compact proof that others already rely on the business.' },
  { id: 'features', label: 'Benefits & features', target: 45, description: 'Outcomes first, mechanics second. Layouts for explaining value at a glance.' },
  { id: 'showcase', label: 'Products & services', target: 30, description: 'Present what is for sale, with enough detail to choose.' },
  { id: 'process', label: 'How it works', target: 20, description: 'Sequences that make the path from first contact to result feel short.' },
  { id: 'testimonials', label: 'Testimonials & reviews', target: 25, description: 'Customer voice, attributed and specific.' },
  { id: 'case-studies', label: 'Case studies & results', target: 20, description: 'Before, approach, after. Evidence presented with context.' },
  { id: 'portfolio', label: 'Portfolio & galleries', target: 20, description: 'Show the work. Layouts for projects, properties and photography.' },
  { id: 'pricing', label: 'Pricing & packages', target: 25, description: 'Clear prices, honest comparisons, an obvious recommended choice.' },
  { id: 'comparison', label: 'Comparison tables', target: 15, description: 'Side-by-side clarity for plans, options and alternatives.' },
  { id: 'forms', label: 'Lead-generation forms', target: 20, description: 'Short, accessible forms that ask only what is needed.' },
  { id: 'cta', label: 'CTA sections', target: 25, description: 'Closing sections that restate the offer and remove the last doubt.' },
  { id: 'faq', label: 'FAQ sections', target: 15, description: 'Answer objections before they become reasons to leave.' },
  { id: 'contact', label: 'Contact sections', target: 15, description: 'Every way to reach the business, in the order people prefer.' },
  { id: 'stats', label: 'Statistics & metrics', target: 15, description: 'A few meaningful numbers, each with its source and context.' },
  { id: 'team', label: 'Team & company', target: 15, description: 'The people and principles behind the business.' },
  { id: 'industry', label: 'Industry-specific', target: 40, description: 'Sections shaped around a single trade: listings, menus, clinics, courses.' },
  { id: 'blog', label: 'Blog & resources', target: 20, description: 'Content hubs, featured articles and downloadable guides.' },
  { id: 'footers', label: 'Footers', target: 15, description: 'The last stop: navigation, contact details, legal and service areas.' },
  { id: 'banners', label: 'Banners, guarantees & offers', target: 15, description: 'Time-bound offers, guarantees and shipping or financing notes.' },
]

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]))
export const categoryOrder = Object.fromEntries(categories.map((c, i) => [c.id, i]))
