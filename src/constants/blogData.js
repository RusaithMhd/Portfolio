export const blogCategories = [
  "All",
  "Odoo & ERP",
  "Web Development",
  "AI & Machine Learning",
  "Digital Marketing",
  "Design & UI/UX",
  "Freelancing"
];

export const blogPosts = [
  {
    id: 1,
    slug: "build-custom-odoo-module-scratch",
    title: "How to Build a Custom Odoo Module from Scratch (Odoo 17)",
    category: "Odoo & ERP",
    excerpt: "A step-by-step guide to developing your first custom Odoo module using Python and XML, tailored for Odoo 17.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop",
    readTime: "8 min read",
    date: "May 25, 2024",
    tags: ["Odoo", "Python", "ERP", "Backend"],
    content: `
## Introduction to Odoo Module Development

Odoo is a powerful, open-source ERP system that is highly customizable. Building a custom module allows you to tailor the system to exact business requirements. In this guide, we'll build a simple "Real Estate" management module for Odoo 17.

### Prerequisites
- Basic understanding of Python and XML.
- Odoo 17 installed locally or on a server.
- A configured Odoo development environment.

## Step 1: The Module Structure
Every Odoo module requires a specific directory structure. At minimum, you need an \`__init__.py\` and a \`__manifest__.py\` file.

\`\`\`python
# __manifest__.py
{
    'name': 'Real Estate',
    'version': '1.0',
    'category': 'Sales',
    'summary': 'Manage Real Estate Properties',
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv',
        'views/estate_property_views.xml',
    ],
    'installable': True,
    'application': True,
}
\`\`\`

## Step 2: Defining the Models
Models map to database tables. We'll define an \`EstateProperty\` model.

\`\`\`python
# models/estate_property.py
from odoo import models, fields

class EstateProperty(models.Model):
    _name = "estate.property"
    _description = "Real Estate Property"

    name = fields.Char(required=True)
    description = fields.Text()
    postcode = fields.Char()
    date_availability = fields.Date(copy=False)
    expected_price = fields.Float(required=True)
\`\`\`

## Step 3: Creating Views
Views define how data is presented in the UI.

\`\`\`xml
<!-- views/estate_property_views.xml -->
<odoo>
    <record id="estate_property_action" model="ir.actions.act_window">
        <field name="name">Properties</field>
        <field name="res_model">estate.property</field>
        <field name="view_mode">tree,form</field>
    </record>
</odoo>
\`\`\`

## Conclusion
You've now created a basic structural foundation for an Odoo 17 module! As an [Odoo developer in Sri Lanka](/#contact), I specialize in extending these concepts into full-blown enterprise applications. Reach out if you need help automating your business!
    `
  },
  {
    id: 2,
    slug: "nextjs-14-app-router-beginners-guide",
    title: "Next.js 14 App Router: Complete Beginner's Guide",
    category: "Web Development",
    excerpt: "Master the fundamentals of Next.js 14 App Router, including Server Components, layouts, and data fetching.",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1470&auto=format&fit=crop",
    readTime: "10 min read",
    date: "June 2, 2024",
    tags: ["Next.js", "React", "Frontend", "TypeScript"],
    content: `
## Why Next.js 14?

Next.js has revolutionized React development. With the introduction of the App Router in version 13 and its stabilization in 14, building fast, SEO-friendly applications has never been easier.

### React Server Components (RSC)
By default, components inside the \`app\` directory are React Server Components. This means they render on the server, reducing the JavaScript bundle sent to the client.

\`\`\`tsx
// app/page.tsx (Server Component)
export default async function Page() {
  const data = await fetch('https://api.example.com/data').then((res) => res.json())
  
  return (
    <main>
      <h1>{data.title}</h1>
    </main>
  )
}
\`\`\`

### When to use Client Components
If you need interactivity (like \`useState\` or \`onClick\`), you must explicitly mark the file as a client component.

\`\`\`tsx
'use client'
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
}
\`\`\`

## Data Fetching Strategies
Next.js 14 extends the native \`fetch\` API, allowing you to cache and revalidate data easily.
- **Static Data:** \`fetch('...', { cache: 'force-cache' })\`
- **Dynamic Data:** \`fetch('...', { cache: 'no-store' })\`
- **Revalidated Data:** \`fetch('...', { next: { revalidate: 3600 } })\`

If you are looking to build a high-performance web application, [let's connect](/#contact)! I build robust React and Next.js applications tailored for your needs.
    `
  },
  {
    id: 3,
    slug: "ai-tools-speed-up-dev-workflow",
    title: "How I Use AI Tools to Speed Up My Dev Workflow",
    category: "AI & Machine Learning",
    excerpt: "Discover the AI tools and prompts I use daily to write code faster, debug efficiently, and automate repetitive tasks.",
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1565&auto=format&fit=crop",
    readTime: "6 min read",
    date: "June 10, 2024",
    tags: ["AI", "Productivity", "ChatGPT", "Copilot"],
    content: `
## AI is a Developer's Best Friend

As a freelance developer, time is money. AI hasn't replaced my job; it has eliminated the boring parts of it. Here is how I integrate AI into my daily workflow.

### 1. GitHub Copilot for Boilerplate
I no longer type out repetitive React boilerplate or basic utility functions. Copilot accurately predicts what I need based on function names and comments.

### 2. ChatGPT for Architecture & Debugging
When I encounter a cryptic Odoo traceback or a bizarre React hydration error, pasting the stack trace into ChatGPT or Claude often yields the exact line of code causing the issue, complete with an explanation.

### 3. V0 & AI Design Generators
When prototyping for clients, I use tools like v0.dev to quickly generate Tailwind CSS layouts. It allows me to present a visual concept in hours rather than days.

### My Golden Rules for AI
1. **Never copy-paste blindly.** Always understand the code AI generates.
2. **Context is everything.** The better your prompt (e.g., providing database schema or current component code), the better the output.
3. **Security first.** Never paste sensitive API keys or proprietary client logic into public AI models.

Want to integrate AI into your own business workflows? I specialize in building custom AI-integrated solutions. [Reach out here](/#contact).
    `
  },
  {
    id: 4,
    slug: "seo-for-developers-rank-portfolio",
    title: "SEO for Developers: How to Rank Your Portfolio Site",
    category: "Digital Marketing",
    excerpt: "A practical guide for developers on optimizing their portfolio websites to rank higher on Google and attract clients.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1430&auto=format&fit=crop",
    readTime: "7 min read",
    date: "June 15, 2024",
    tags: ["SEO", "Marketing", "Portfolio"],
    content: `
## Code is Not Enough

You can build the fastest, most beautiful portfolio using React and Three.js, but if Google can't read it, clients can't find it. 

### Core Web Vitals
Google ranks sites based on performance. As developers, this is our playground.
- Optimize images (use WebP).
- Lazy load off-screen components.
- Minimize main-thread blocking JavaScript.

### Semantic HTML and Meta Tags
Ensure your site has:
- A single \`<h1>\` per page.
- Proper \`<title>\` and \`<meta name="description">\` tags injected dynamically (using tools like React Helmet or Next.js Metadata).
- Open Graph tags for beautiful social sharing.

### Structured Data (JSON-LD)
JSON-LD tells search engines exactly who you are. For a freelancer, a \`Person\` or \`ProfessionalService\` schema is crucial.

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "MIM Rusaith",
  "jobTitle": "Odoo ERP Consultant",
  "url": "https://rusaith.com"
}
\`\`\`

If you need a blazing fast, SEO-optimized website for your business, check out my [Solutions](/#services) and let's get started.
    `
  },
  {
    id: 5,
    slug: "figma-to-code-workflow",
    title: "My Figma-to-Code Workflow for Freelance Projects",
    category: "Design & UI/UX",
    excerpt: "Learn how I transition seamlessly from UI/UX design in Figma to pixel-perfect React and Tailwind CSS components.",
    coverImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1374&auto=format&fit=crop",
    readTime: "9 min read",
    date: "June 20, 2024",
    tags: ["Figma", "UI/UX", "Tailwind", "Design"],
    content: `
## Bridging the Gap Between Design and Dev

As someone who operates as both a Graphic Designer and a Web Developer, I have refined my workflow to ensure that what gets designed is exactly what gets built.

### 1. Design Tokens First
Before I draw a single rectangle in Figma, I establish my design tokens:
- Typography scale
- Color palette
- Spacing variables

These map 1:1 with my \`tailwind.config.js\`.

### 2. Auto Layout is Flexbox
I strictly use Auto Layout in Figma. If a designer builds a component with Auto Layout, translating it to Tailwind's flexbox utilities (\`flex\`, \`items-center\`, \`justify-between\`, \`gap-4\`) is completely effortless.

### 3. Component Architecture
I design atomic components in Figma (Buttons, Inputs, Cards). When I switch to VS Code, I build these exact same components in React first, ensuring they accept the same props/variants I designed in Figma.

### Conclusion
A disciplined Figma file leads to a clean, maintainable codebase. If you are looking for a developer who understands design nuances, you're in the right place. [Check out my portfolio](/#projects) to see this workflow in action.
    `
  },
  {
    id: 6,
    slug: "first-freelance-client-sri-lanka",
    title: "How I Got My First Freelance Client as a Sri Lankan Developer",
    category: "Freelancing",
    excerpt: "My journey from learning to code to landing my first paying client, with actionable tips for aspiring freelancers.",
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop",
    readTime: "5 min read",
    date: "June 28, 2024",
    tags: ["Freelance", "Career", "Sri Lanka"],
    content: `
## Starting Out

Breaking into the freelance market, especially competing globally from Sri Lanka, can feel daunting. Here is the exact strategy I used to land my first client.

### Building Proof of Work
Clients don't care about the tutorials you watched; they care about what you can build. I spent weeks building a highly polished, interactive portfolio (the one you are on right now!) to showcase my skills in React and UI/UX design.

### Niche Down
"Web Developer" is too broad. I marketed myself specifically as a **Full Stack Web Developer & Odoo ERP Consultant**. When local businesses needed Odoo customization, I was one of the few specialists they could find easily.

### The Power of Local Networking
My first client didn't come from Upwork; it came from local networking in Colombo. I reached out to small businesses with poorly optimized websites and offered concrete solutions to fix their issues.

### Key Takeaways
- Have a stunning portfolio.
- Pick a profitable niche (like Odoo ERP).
- Don't ignore local clients.

Need help building your own digital presence? I am available for freelance work worldwide. [Contact me today](/#contact).
    `
  },
  {
    id: 7,
    slug: "why-sri-lankan-businesses-need-odoo-erp",
    title: "Why Your Sri Lankan Business Needs an Odoo ERP System",
    category: "Odoo & ERP",
    excerpt: "Discover how implementing Odoo ERP can streamline operations, reduce costs, and scale your business in Sri Lanka.",
    coverImage: "https://media.licdn.com/dms/image/v2/D5612AQFdZQant0LZZA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1728974636736?e=1782345600&v=beta&t=uYRSKNrNHcfpEZA9LfwYk8ZTQ2el_5kmYYxXaQqrCqU",
    readTime: "6 min read",
    date: "July 5, 2024",
    tags: ["Odoo", "Business", "Sri Lanka", "ERP"],
    content: `
## The Shift to Digital in Sri Lanka

In today's competitive landscape, businesses in Colombo and across Sri Lanka can no longer rely on fragmented spreadsheets and manual data entry. To scale effectively, you need a centralized system. Enter **Odoo ERP**.

### What is Odoo?
Odoo is an all-in-one suite of open-source business apps. It covers everything from CRM and Sales to Inventory, Accounting, and HR.

### Key Benefits for Local Businesses

#### 1. Cost-Effective Scaling
Unlike legacy ERPs (like SAP or Oracle) which require massive upfront licensing fees, Odoo's modular approach allows you to start small. You only pay for the apps you use, making it incredibly budget-friendly for Sri Lankan SMEs.

#### 2. Complete Customization
No two businesses run exactly the same. As an **Odoo Consultant based in Sri Lanka**, I frequently build custom modules tailored specifically to local tax regulations (like VAT/SSCL) and local HR payroll structures.

#### 3. Real-Time Analytics
Make informed decisions instantly. Odoo's dashboard gives owners a real-time overview of inventory levels, pending invoices, and sales performance.

### Ready to Upgrade?
If you are tired of juggling multiple software subscriptions, [contact me](/#contact) for a free consultation on how we can implement Odoo for your company.
    `
  },
  {
    id: 8,
    slug: "react-performance-optimization-tips",
    title: "Top 5 React Performance Optimization Techniques",
    category: "Web Development",
    excerpt: "Speed up your React applications by avoiding unnecessary re-renders, implementing code splitting, and using useMemo effectively.",
    coverImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1470&auto=format&fit=crop",
    readTime: "8 min read",
    date: "July 12, 2024",
    tags: ["React", "Performance", "Frontend"],
    content: `
## Speed Matters

A slow React app leads to high bounce rates and poor SEO. Here are 5 techniques I use to keep my React applications running at 60fps.

### 1. Code Splitting with \`React.lazy()\`
Don't send down megabytes of JavaScript on the initial load. Split your components so users only download the code they need when they need it.

\`\`\`jsx
import React, { Suspense, lazy } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<p>Loading chart...</p>}>
      <HeavyChart />
    </Suspense>
  );
}
\`\`\`

### 2. Memoize Expensive Calculations
If you have a function that processes a massive array, wrap it in \`useMemo\` so it only recalculates when its dependencies change.

### 3. Avoid Anonymous Functions in Props
Passing \`onClick={() => doSomething()}\` inside a mapped list forces the child component to re-render every time the parent renders, as a new function reference is created. Use \`useCallback\`.

### 4. Virtualize Long Lists
If you are rendering 1,000+ items, use libraries like \`react-window\` to only render the DOM nodes currently visible on the screen.

### 5. Optimize Images
Always use WebP format, implement lazy loading (\`loading="lazy"\`), and define explicit width/height attributes to prevent Cumulative Layout Shift (CLS).

If your web application is suffering from performance issues, I can help audit and fix it. [Let's talk](/#contact).
    `
  },
  {
    id: 9,
    slug: "custom-ecommerce-website-cost-sri-lanka",
    title: "How Much Does a Custom E-commerce Website Cost in Sri Lanka?",
    category: "Freelancing",
    excerpt: "A transparent breakdown of the costs associated with building a custom, high-performance E-commerce website in 2024.",
    coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1470&auto=format&fit=crop",
    readTime: "7 min read",
    date: "July 18, 2024",
    tags: ["E-commerce", "Sri Lanka", "Web Development", "Cost"],
    content: `
## The Real Cost of E-commerce

"How much does an e-commerce site cost?" is the most common question I get from clients in Colombo. The answer? *It depends.* Here is a transparent breakdown.

### Option 1: Template Solutions (Shopify / WooCommerce)
**Estimated Cost:** $300 - $800
If you are just starting out, customizing a Shopify theme or using WordPress/WooCommerce is the most cost-effective route. You trade total control for speed and lower upfront costs.

### Option 2: Custom Headless E-commerce
**Estimated Cost:** $1,500 - $5,000+
If you need lightning-fast speeds (for SEO), complex product variations, or custom integrations (like connecting to an Odoo ERP backend), a custom React/Next.js frontend paired with a headless backend (like MedusaJS or Shopify Storefront API) is required.

### Recurring Costs to Consider
- **Hosting:** Vercel/AWS ($20 - $100+/mo)
- **Payment Gateways:** Local gateways (Webxpay, PayHere) charge setup fees and per-transaction percentages.
- **Maintenance:** Ongoing SEO and security updates.

Investing in a high-quality, custom e-commerce site pays dividends through higher conversion rates. Looking for a quote? [Reach out to me directly](/#contact).
    `
  },
  {
    id: 10,
    slug: "migrating-odoo-16-to-17-developers",
    title: "Migrating from Odoo 16 to Odoo 17: What Developers Need to Know",
    category: "Odoo & ERP",
    excerpt: "A technical overview of the breaking changes, new features, and migration paths when upgrading to Odoo 17.",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop",
    readTime: "9 min read",
    date: "July 24, 2024",
    tags: ["Odoo", "ERP", "Migration", "Python"],
    content: `
## Embracing Odoo 17

Odoo 17 brings a completely revamped UI, massive performance improvements, and several structural changes under the hood. If you are a developer tasked with migrating custom modules from v16, here is what you need to prepare for.

### 1. The New UI & OWL Framework
Odoo 17 fully embraces the OWL (Odoo Web Library) framework. If your custom v16 modules relied heavily on legacy JavaScript/jQuery widgets, you will need to rewrite them as OWL components.

### 2. Search View Syntax Changes
The way search panels and domain filters are defined in XML has seen minor but strict syntax updates. Ensure you validate your XML files against the new Odoo 17 schemas.

### 3. Database Migration
If you are using Odoo Enterprise, you can utilize the standard upgrade scripts. However, for Community Edition, you will likely need to rely on the OpenUpgrade project, which requires careful mapping of deprecated fields to new structures.

### Pro Tip for Smooth Migration
Always write robust unit tests (\`Python unittests\`) for your custom business logic *before* you migrate. It ensures that your calculations remain accurate after the underlying ORM updates.

Need an expert to handle your Odoo migration safely without data loss? [Hire me as your Odoo Consultant](/#contact).
    `
  },
  {
    id: 11,
    slug: "nextjs-vs-vite-react-frameworks",
    title: "Next.js vs Vite: Which React Framework Should You Choose?",
    category: "Web Development",
    excerpt: "An in-depth comparison of Next.js and Vite to help you choose the right architecture for your next React project.",
    coverImage: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1374&auto=format&fit=crop",
    readTime: "8 min read",
    date: "August 2, 2024",
    tags: ["React", "Next.js", "Vite", "Frontend"],
    content: `
## The React Dilemma

Create React App (CRA) is officially dead. The modern React ecosystem now forces a choice: build a Single Page Application (SPA) with **Vite**, or build a Server-Side Rendered (SSR) app with **Next.js**. 

### When to Choose Vite
Vite is incredibly fast. It serves your code via native ES modules during development, making HMR (Hot Module Replacement) instant.

**Use Vite if:**
- You are building an internal dashboard or admin panel (like an Odoo custom frontend).
- SEO does not matter (the app sits behind a login screen).
- You want the simplest possible React architecture.

### When to Choose Next.js
Next.js (especially with the new App Router) provides SSR and Static Site Generation (SSG) out of the box.

**Use Next.js if:**
- **SEO is critical** (e-commerce, blogs, landing pages).
- You want to utilize React Server Components (RSC) to reduce client-side bundle size.
- You need built-in API routes without standing up a separate Node.js server.

### My Personal Stack
For my freelance clients in Sri Lanka, I generally use Next.js for their public-facing marketing sites and Vite for their internal web applications. Need help deciding the architecture for your project? [Let's connect](/#contact).
    `
  }
];
