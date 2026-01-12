# Presentations Content Type - Design Document

**Mode**: Solution Architecture
**Status**: Proposed
**Created**: January 2026

---

## 1. Overview

This document proposes the architecture for introducing a "presentations" content type to the Signal Dispatch blog. Presentations are interactive HTML slide decks (like the Neuro-Symbolic Convergence deck) that need to be published, indexed, and optimized for discovery.

### Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Source Format** | MDX with frontmatter + separate HTML file | MDX provides metadata and excerpt; HTML provides the interactive deck |
| **Storage** | `/src/content/presentations/` | Follows existing collection pattern |
| **Routing** | `/blog/presentations/` and `/blog/presentations/[slug]` | Consistent with whitepapers pattern |
| **Rendering** | Iframe embed of HTML deck | Preserves interactivity; isolates deck CSS/JS |
| **JSON-LD** | `PresentationDigitalDocument` schema | Optimized for LLM/AEO discovery |

---

## 2. Content Collection Schema

### 2.1 Schema Definition

Add to `/src/content.config.ts`:

```typescript
const presentationCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/presentations' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    publishedAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()).optional(),
    author: z.string().default('Nino Chavez'),
    excerpt: z.string().optional().default(''),

    // Presentation-specific fields
    slideCount: z.number(),
    duration: z.string().optional(), // e.g., "15 min"
    audience: z.string().optional(), // e.g., "Technology executives, product leaders"
    mode: z.enum(['executive-advisory', 'solution-architecture', 'thought-leadership']).default('executive-advisory'),

    // The HTML deck file (stored in public/presentations/)
    deckFile: z.string(), // e.g., "neuro-symbolic-convergence.html"

    // Optional video recording
    videoUrl: z.string().optional(),

    // Categorization
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featureImage: z.string().optional(),

    // SEO
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    }).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  whitepapers: whitepaperCollection,
  presentations: presentationCollection,  // Add this
};
```

### 2.2 Content File Structure

```
src/content/presentations/
├── neuro-symbolic-convergence.mdx
├── agentic-commerce-ecosystem.mdx
└── ai-governance-framework.mdx

public/presentations/
├── neuro-symbolic-convergence.html
├── agentic-commerce-ecosystem.html
└── ai-governance-framework.html
```

### 2.3 Example MDX File

```mdx
---
title: "The Neuro-Symbolic Convergence"
slug: "neuro-symbolic-convergence"
publishedAt: "2026-01-10"
author: "Nino Chavez"
excerpt: "A strategic roadmap for native AI integration in operating systems. Exploring the shift from CLI to NLP as the primary OS interface across Windows, macOS, and Linux (2025-2027)."
slideCount: 14
duration: "20 min"
audience: "Technology executives, product leaders, developers"
mode: "executive-advisory"
deckFile: "neuro-symbolic-convergence.html"
category: "AI Strategy"
tags:
  - AI
  - Operating Systems
  - NPU
  - Windows
  - macOS
  - Linux
  - MCP
featureImage: "/presentations/thumbnails/neuro-symbolic-convergence.png"
seo:
  metaTitle: "The Neuro-Symbolic Convergence | Native AI in Operating Systems"
  metaDescription: "Strategic roadmap for native AI integration in Windows, macOS, and Linux. From CLI to NLP interfaces, 2025-2027."
---

## Summary

The command line is about to become a conversational interface. This presentation explores how Windows, macOS, and Linux are integrating native AI capabilities at the OS level—not as add-ons, but as core infrastructure.

## Key Takeaways

1. **Hardware enables the shift**: 40+ TOPS NPUs make local LLM inference viable
2. **Three paths converge**: Windows AI Shell, macOS `afm`, Linux Sovereign AI
3. **MCP is the bridge**: Model Context Protocol enables standardized AI-system integration
4. **Security is the constraint**: New privilege tiers and sandboxing are emerging
5. **Timeline is 2026-2027**: Native integration ships across all major platforms

## Slide Outline

1. Title: The End of the "Dumb" Terminal
2. The Copy-Paste Loop Problem
3. Three Epochs of OS Interaction
4. The Hardware Gate (NPU Requirements)
5. Native vs. Available AI
6. Windows AI Shell Architecture
7. macOS `afm` and Private Cloud Compute
8. Linux Sovereign AI Stack
9. Model Context Protocol (MCP)
10. Security Considerations
11. Strategic Timeline
12. Recommendations
13. Closing Frame
14. Discussion Questions
```

---

## 3. Page Templates

### 3.1 Index Page: `/src/pages/blog/presentations/index.astro`

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../../layouts/BaseLayout.astro';
import { generatePresentationsCollectionSchema } from '../../../utils/schema';

const presentations = await getCollection('presentations');
const sortedPresentations = presentations.sort(
  (a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime()
);

const collectionSchema = generatePresentationsCollectionSchema(
  'Signal Dispatch Presentations',
  'Interactive strategic presentations on AI, architecture, and technology.',
  'https://blog.ninochavez.co/presentations',
  sortedPresentations
);
---

<BaseLayout
  title="Presentations"
  description="Interactive strategic presentations on AI, architecture, and technology by Nino Chavez."
  jsonLd={[collectionSchema]}
>
  <main class="min-h-screen">
    <!-- Header (same pattern as whitepapers) -->

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="space-y-3">
        <a href="/blog" class="...">Back to Blog</a>
        <div class="flex items-center gap-4">
          <h1 class="text-3xl md:text-4xl font-black text-white">Presentations</h1>
          <span class="text-sm text-zinc-500 ...">
            {sortedPresentations.length} decks
          </span>
        </div>
        <p class="text-zinc-400 max-w-2xl">
          Interactive strategic presentations. Click to launch the full deck experience.
        </p>
      </div>
    </section>

    <!-- Presentations Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="grid gap-6 md:grid-cols-2">
        {sortedPresentations.map((presentation, index) => (
          <a href={`/blog/presentations/${presentation.id}`} class="group block">
            <article class="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:border-athletic-brand-violet/50 transition-all duration-300">
              <!-- Thumbnail -->
              <div class="aspect-video relative overflow-hidden">
                <img
                  src={presentation.data.featureImage || `/presentations/thumbnails/${presentation.data.deckFile.replace('.html', '.png')}`}
                  alt={presentation.data.title}
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />

                <!-- Play button overlay -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-16 h-16 rounded-full bg-athletic-brand-violet/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

                <!-- Slide count badge -->
                <div class="absolute bottom-4 right-4 px-2 py-1 rounded bg-zinc-900/80 text-xs text-zinc-300">
                  {presentation.data.slideCount} slides
                </div>
              </div>

              <!-- Content -->
              <div class="p-6">
                <div class="flex items-center gap-3 text-xs mb-3">
                  <span class="font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-athletic-court-orange/10 border border-athletic-court-orange/30 text-athletic-court-orange">
                    Presentation
                  </span>
                  <span class="text-zinc-500">
                    {new Date(presentation.data.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  {presentation.data.duration && (
                    <>
                      <span class="text-zinc-600">•</span>
                      <span class="text-zinc-500">{presentation.data.duration}</span>
                    </>
                  )}
                </div>

                <h2 class="text-xl font-bold text-white group-hover:text-athletic-court-orange transition-colors mb-2">
                  {presentation.data.title}
                </h2>

                {presentation.data.excerpt && (
                  <p class="text-zinc-400 text-sm line-clamp-2 mb-4">
                    {presentation.data.excerpt}
                  </p>
                )}

                <div class="inline-flex items-center gap-2 text-athletic-brand-violet group-hover:text-athletic-court-orange transition-colors font-semibold text-sm">
                  <span>View presentation</span>
                  <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </article>
          </a>
        ))}
      </div>
    </section>
  </main>
</BaseLayout>
```

### 3.2 Detail Page: `/src/pages/blog/presentations/[slug].astro`

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../../layouts/BaseLayout.astro';
import { generatePresentationSchema, generateBreadcrumbSchema } from '../../../utils/schema';

export async function getStaticPaths() {
  const presentations = await getCollection('presentations');
  return presentations.map((presentation) => ({
    params: { slug: presentation.id },
    props: { presentation },
  }));
}

const { presentation } = Astro.props;
const { Content } = await presentation.render();

const presentationSchema = generatePresentationSchema(presentation);
const breadcrumbSchema = generateBreadcrumbSchema(presentation, 'presentations');

const deckUrl = `/presentations/${presentation.data.deckFile}`;
---

<BaseLayout
  title={presentation.data.title}
  description={presentation.data.excerpt}
  image={presentation.data.featureImage}
  jsonLd={[presentationSchema, breadcrumbSchema]}
>
  <main class="min-h-screen">
    <!-- Compact Header -->
    <header class="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800/30">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-[73px]">
          <a href="/blog/presentations" class="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Presentations
          </a>
          <div class="flex items-center gap-4">
            <a href={deckUrl} target="_blank" class="text-sm text-athletic-brand-violet hover:text-athletic-court-orange transition-colors flex items-center gap-1">
              Open fullscreen
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </header>

    <!-- Presentation Embed -->
    <section class="w-full bg-zinc-950">
      <div class="max-w-7xl mx-auto">
        <div class="aspect-[16/9] w-full">
          <iframe
            src={deckUrl}
            class="w-full h-full border-0"
            title={presentation.data.title}
            allow="fullscreen"
          />
        </div>
      </div>
    </section>

    <!-- Metadata & Summary -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="space-y-8">
        <!-- Title & Meta -->
        <div class="space-y-4">
          <div class="flex items-center gap-3 text-sm">
            <span class="font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-athletic-court-orange/10 border border-athletic-court-orange/30 text-athletic-court-orange">
              Presentation
            </span>
            <span class="text-zinc-500">
              {new Date(presentation.data.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span class="text-zinc-600">•</span>
            <span class="text-zinc-500">{presentation.data.slideCount} slides</span>
            {presentation.data.duration && (
              <>
                <span class="text-zinc-600">•</span>
                <span class="text-zinc-500">{presentation.data.duration}</span>
              </>
            )}
          </div>

          <h1 class="text-3xl md:text-4xl font-black text-white">
            {presentation.data.title}
          </h1>

          {presentation.data.audience && (
            <p class="text-zinc-400">
              <span class="text-zinc-500">Audience:</span> {presentation.data.audience}
            </p>
          )}
        </div>

        <!-- Summary Content (from MDX body) -->
        <div class="prose prose-invert prose-zinc max-w-none">
          <Content />
        </div>

        <!-- Tags -->
        {presentation.data.tags && presentation.data.tags.length > 0 && (
          <div class="flex flex-wrap gap-2 pt-4 border-t border-zinc-800">
            {presentation.data.tags.map((tag) => (
              <a
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                class="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-sm hover:bg-zinc-700 hover:text-white transition-colors"
              >
                {tag}
              </a>
            ))}
          </div>
        )}

        <!-- Share / Actions -->
        <div class="flex items-center gap-4 pt-4 border-t border-zinc-800">
          <a
            href={deckUrl}
            target="_blank"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-athletic-brand-violet text-white hover:bg-athletic-brand-violet/80 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download / Open Fullscreen
          </a>

          {presentation.data.videoUrl && (
            <a
              href={presentation.data.videoUrl}
              target="_blank"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Recording
            </a>
          )}
        </div>
      </div>
    </section>
  </main>
</BaseLayout>
```

---

## 4. JSON-LD Schema Extension

Add to `/src/utils/schema.ts`:

```typescript
interface PresentationData {
  id: string;
  data: {
    title: string;
    excerpt: string;
    publishedAt: string | Date;
    updatedAt?: string | Date;
    author?: string;
    slideCount: number;
    duration?: string;
    audience?: string;
    mode?: string;
    deckFile: string;
    tags?: string[];
    category?: string;
    featureImage?: string;
  };
}

/**
 * Generate PresentationDigitalDocument schema for presentations
 * Uses schema.org PresentationDigitalDocument for optimal LLM/AEO discovery
 */
export function generatePresentationSchema(presentation: PresentationData) {
  const { data, id } = presentation;
  const publishDate = new Date(data.publishedAt).toISOString();
  const modifiedDate = data.updatedAt
    ? new Date(data.updatedAt).toISOString()
    : publishDate;

  const imageUrl = data.featureImage
    ? (data.featureImage.startsWith('http') ? data.featureImage : `${SITE_URL}${data.featureImage}`)
    : `${SITE_URL}/og_image.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'PresentationDigitalDocument',
    '@id': `${SITE_URL}/presentations/${id}#presentation`,
    name: data.title,
    headline: data.title,
    description: data.excerpt,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: publishDate,
    dateModified: modifiedDate,
    author: AUTHOR,
    publisher: PUBLISHER,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/presentations/${id}`,
    },
    url: `${SITE_URL}/presentations/${id}`,
    keywords: data.tags?.join(', ') || '',
    learningResourceType: 'Presentation',
    educationalUse: 'instruction',
    audience: data.audience ? {
      '@type': 'Audience',
      audienceType: data.audience,
    } : undefined,
    numberOfPages: data.slideCount,
    timeRequired: data.duration ? `PT${data.duration.replace(' min', 'M')}` : undefined,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    encodingFormat: 'text/html',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      name: 'Signal Dispatch',
    },
    // AEO-specific
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.summary', '.key-takeaways'],
    },
  };
}

/**
 * Generate CollectionPage schema for presentations index
 */
export function generatePresentationsCollectionSchema(
  name: string,
  description: string,
  url: string,
  presentations: PresentationData[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url,
    name,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: presentations.length,
      itemListElement: presentations.map((presentation, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'PresentationDigitalDocument',
          url: `${SITE_URL}/presentations/${presentation.id}`,
          name: presentation.data.title,
          description: presentation.data.excerpt,
          numberOfPages: presentation.data.slideCount,
        },
      })),
    },
  };
}
```

---

## 5. File Organization

### 5.1 Directory Structure

```
signal-dispatch-blog/
├── astro-build/
│   ├── src/
│   │   ├── content/
│   │   │   ├── blog/           # Existing
│   │   │   ├── whitepapers/    # Existing
│   │   │   └── presentations/  # NEW: MDX metadata files
│   │   │       └── neuro-symbolic-convergence.mdx
│   │   ├── pages/
│   │   │   └── blog/
│   │   │       ├── presentations/  # NEW
│   │   │       │   ├── index.astro
│   │   │       │   └── [slug].astro
│   │   │       └── whitepapers/
│   │   └── utils/
│   │       └── schema.ts  # Extended with presentation schemas
│   └── public/
│       └── presentations/  # NEW: HTML deck files + thumbnails
│           ├── neuro-symbolic-convergence.html
│           └── thumbnails/
│               └── neuro-symbolic-convergence.png
```

### 5.2 Publishing Workflow

1. **Create deck in Signal Forge** → `projects/internal/decks/neuro-symbolic-convergence.html`
2. **Copy HTML to blog public** → `public/presentations/neuro-symbolic-convergence.html`
3. **Generate thumbnail** → `public/presentations/thumbnails/neuro-symbolic-convergence.png`
4. **Create MDX metadata** → `src/content/presentations/neuro-symbolic-convergence.mdx`
5. **Deploy** → Vercel picks up new files automatically

---

## 6. Integration with Blog Index

Update the main blog index (`/blog/index.astro`) to include a presentations section or link:

```astro
<!-- Add to navigation -->
<div class="flex items-center gap-4">
  <a href="/blog" class="text-sm text-zinc-400 hover:text-white transition-colors">Blog</a>
  <a href="/blog/whitepapers" class="text-sm text-zinc-400 hover:text-white transition-colors">Whitepapers</a>
  <a href="/blog/presentations" class="text-sm text-zinc-400 hover:text-white transition-colors">Presentations</a>  <!-- NEW -->
</div>
```

---

## 7. Implementation Checklist

- [ ] Create `src/content/presentations/` directory
- [ ] Create `public/presentations/` directory
- [ ] Add `presentationCollection` to `content.config.ts`
- [ ] Create `/src/pages/blog/presentations/index.astro`
- [ ] Create `/src/pages/blog/presentations/[slug].astro`
- [ ] Add `generatePresentationSchema()` to `schema.ts`
- [ ] Add `generatePresentationsCollectionSchema()` to `schema.ts`
- [ ] Update blog navigation to include Presentations link
- [ ] Copy first presentation (neuro-symbolic-convergence) to test
- [ ] Generate thumbnail for first presentation
- [ ] Create first MDX metadata file
- [ ] Test locally
- [ ] Deploy to Vercel

---

## 8. Future Enhancements

| Enhancement | Description | Priority |
|-------------|-------------|----------|
| **Auto-thumbnail generation** | Script to capture first slide as PNG | Medium |
| **Deck-from-MDX generation** | Generate HTML decks from structured MDX | High |
| **Presentation mode** | Add "present" button that opens fullscreen with keyboard controls | Medium |
| **Analytics tracking** | Track slide views and time spent | Low |
| **PDF export** | Generate downloadable PDF from HTML deck | Medium |
| **RSS feed** | Include presentations in dedicated RSS feed | Low |

---

## 9. Notes

**Why separate HTML files instead of inline?**
- HTML decks are self-contained with their own CSS and JS
- Iframe isolation prevents style conflicts with the blog theme
- Allows direct linking to fullscreen presentation experience
- Enables offline viewing when downloaded

**Why MDX for metadata?**
- Consistent with existing content patterns
- Allows rich summary content (markdown formatting)
- Supports frontmatter validation via Zod schema
- Enables Astro content collection features (sorting, filtering)

**Why not generate decks from MDX?**
- Current HTML decks have complex interactivity (keyboard nav, animations)
- Custom designs per deck are intentional
- Would lose design flexibility
- Future enhancement could support both patterns
