import { defineStackbitConfig, type SiteMapEntry } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

/**
 * Netlify Visual Editor configuration for The Back Pain Doctor (Astro).
 *
 * Astro is supported via `ssgName: "custom"`. Content is read from the local
 * Git repository (markdown / mdx frontmatter and JSON config) through
 * GitContentSource. Unmodelled frontmatter fields are preserved on save.
 *
 * Docs: https://docs.netlify.com/manage/visual-editor/frameworks/astro/
 */

// ---- Reusable inline field groups -------------------------------------------

const linkFields = [
  { type: "string", name: "label", label: "Label" },
  { type: "string", name: "href", label: "URL" },
];

const ctaFields = [
  { type: "boolean", name: "hasCTA", label: "Show button" },
  {
    type: "object",
    name: "cta",
    label: "Button",
    fields: [
      { type: "string", name: "label", label: "Label" },
      { type: "string", name: "href", label: "URL" },
    ],
  },
];

const serviceItemFields = [
  { type: "string", name: "title", label: "Title" },
  { type: "string", name: "subtitle", label: "Subtitle" },
  { type: "markdown", name: "description", label: "Description" },
  ...ctaFields,
  { type: "image", name: "image", label: "Image" },
  { type: "string", name: "image_style", label: "Image CSS classes" },
];

const faqFields = [
  { type: "string", name: "question", label: "Question" },
  { type: "markdown", name: "answer", label: "Answer" },
];

const introFields = [
  { type: "string", name: "title", label: "Title" },
  { type: "string", name: "subtitle", label: "Subtitle" },
  { type: "markdown", name: "description", label: "Description" },
];

// ---- Models -----------------------------------------------------------------

const models: any[] = [
  // ----- Singleton pages -----
  {
    type: "page",
    name: "homepage",
    label: "Homepage",
    singleInstance: true,
    filePath: "src/content/homepage/index.md",
    hideContent: true,
    fields: [
      {
        type: "object",
        name: "banner",
        label: "Hero banner",
        fields: [
          { type: "string", name: "title", label: "Title" },
          { type: "string", name: "meta", label: "Meta text" },
          { type: "image", name: "image", label: "Image" },
          { type: "object", name: "link", label: "Button", fields: linkFields },
        ],
      },
      {
        type: "list",
        name: "service",
        label: "Service sections",
        items: { type: "object", fields: serviceItemFields },
      },
      {
        type: "list",
        name: "brands",
        label: "Brand logos",
        items: { type: "image" },
      },
    ],
  },
  {
    type: "page",
    name: "about",
    label: "About page",
    singleInstance: true,
    filePath: "src/content/about/index.md",
    hideContent: true,
    fields: [
      { type: "string", name: "title", label: "Title" },
      { type: "string", name: "description", label: "Meta description" },
      {
        type: "object",
        name: "about_us",
        label: "About intro",
        fields: [
          { type: "string", name: "subtitle", label: "Subtitle" },
          { type: "string", name: "title", label: "Title" },
          { type: "markdown", name: "description", label: "Description" },
          { type: "image", name: "image", label: "Image" },
        ],
      },
      {
        type: "object",
        name: "works",
        label: "Why choose us",
        fields: [
          { type: "string", name: "subtitle", label: "Subtitle" },
          { type: "string", name: "title", label: "Title" },
          {
            type: "list",
            name: "list",
            label: "Items",
            items: {
              type: "object",
              fields: [
                { type: "string", name: "title", label: "Title" },
                { type: "markdown", name: "content", label: "Content" },
              ],
            },
          },
        ],
      },
      {
        type: "object",
        name: "mission",
        label: "Mission",
        fields: [
          { type: "string", name: "subtitle", label: "Subtitle" },
          { type: "string", name: "title", label: "Title" },
          { type: "markdown", name: "description", label: "Description" },
          { type: "image", name: "image", label: "Image" },
        ],
      },
      {
        type: "object",
        name: "bio",
        label: "Bio",
        fields: [
          { type: "string", name: "subtitle", label: "Subtitle" },
          { type: "string", name: "title", label: "Title" },
          { type: "markdown", name: "description", label: "Description" },
          { type: "image", name: "image", label: "Image" },
        ],
      },
    ],
  },
  {
    type: "page",
    name: "patientJourney",
    label: "Patient Journey page",
    singleInstance: true,
    filePath: "src/content/patient-journey/index.md",
    hideContent: true,
    fields: [
      { type: "string", name: "title", label: "Title" },
      { type: "string", name: "description", label: "Meta description" },
      { type: "object", name: "intro", label: "Intro", fields: introFields },
      {
        type: "list",
        name: "service",
        label: "Journey steps",
        items: { type: "object", fields: serviceItemFields },
      },
    ],
  },
  {
    type: "page",
    name: "bookAppointment",
    label: "Book Appointment page",
    singleInstance: true,
    filePath: "src/content/contact/book-appointment.md",
    fields: [
      { type: "string", name: "title", label: "Title" },
      { type: "string", name: "description", label: "Meta description" },
      { type: "string", name: "image", label: "Image path" },
      { type: "markdown", name: "intro", label: "Intro" },
    ],
  },

  // ----- Treatments -----
  {
    type: "page",
    name: "treatmentsIndex",
    label: "Treatments — index",
    singleInstance: true,
    filePath: "src/content/non-surgical-treatments/-index.md",
    hideContent: true,
    fields: [
      { type: "string", name: "title", label: "Title" },
      { type: "string", name: "description", label: "Meta description" },
      { type: "object", name: "intro", label: "Intro", fields: introFields },
      {
        type: "list",
        name: "treatmentsOverview",
        label: "Treatment cards",
        items: { type: "object", fields: serviceItemFields },
      },
    ],
  },
  {
    type: "page",
    name: "treatment",
    label: "Treatment",
    filePath: "src/content/non-surgical-treatments/{slug}.md",
    exclude: "**/-index.md",
    fields: [
      { type: "string", name: "title", label: "Title" },
      { type: "string", name: "meta_title", label: "SEO title" },
      { type: "string", name: "description", label: "Meta description" },
      { type: "string", name: "image", label: "Image path" },
      { type: "markdown", name: "intro", label: "Intro" },
      {
        type: "list",
        name: "whatItTreats",
        label: "What it can help with",
        items: { type: "string" },
      },
      { type: "markdown", name: "evidence", label: "What the evidence shows" },
      {
        type: "list",
        name: "evidenceSources",
        label: "Evidence sources",
        items: {
          type: "object",
          fields: [
            { type: "string", name: "label", label: "Label" },
            { type: "string", name: "url", label: "URL" },
          ],
        },
      },
      { type: "markdown", name: "whatToExpect", label: "What to expect" },
      {
        type: "list",
        name: "faqs",
        label: "FAQs",
        items: { type: "object", fields: faqFields },
      },
    ],
  },

  // ----- Conditions -----
  {
    type: "page",
    name: "conditionsIndex",
    label: "Conditions — index",
    singleInstance: true,
    filePath: "src/content/conditions/-index.md",
    hideContent: true,
    fields: [
      { type: "string", name: "title", label: "Title" },
      { type: "string", name: "description", label: "Meta description" },
      { type: "object", name: "intro", label: "Intro", fields: introFields },
    ],
  },
  {
    type: "page",
    name: "condition",
    label: "Condition",
    filePath: "src/content/conditions/{slug}.md",
    exclude: "**/-index.md",
    fields: [
      { type: "string", name: "title", label: "Title" },
      { type: "string", name: "description", label: "Meta description" },
      { type: "number", name: "order", label: "Sort order" },
      { type: "markdown", name: "intro", label: "Intro" },
      {
        type: "list",
        name: "symptoms",
        label: "Common symptoms",
        items: { type: "string" },
      },
      {
        type: "list",
        name: "treatmentLinks",
        label: "Treatment links",
        items: {
          type: "object",
          fields: [
            { type: "string", name: "name", label: "Name" },
            { type: "string", name: "href", label: "URL" },
          ],
        },
      },
      {
        type: "list",
        name: "faqs",
        label: "FAQs",
        items: { type: "object", fields: faqFields },
      },
    ],
  },

  // ----- Patient resources (blog) -----
  {
    type: "page",
    name: "resourcesIndex",
    label: "Resources — index",
    singleInstance: true,
    filePath: "src/content/patient-resources/-index.md",
    hideContent: true,
    fields: [
      { type: "string", name: "title", label: "Title" },
      { type: "string", name: "description", label: "Meta description" },
      { type: "string", name: "image", label: "Image path" },
    ],
  },
  {
    type: "page",
    name: "resource",
    label: "Resource article",
    filePath: "src/content/patient-resources/{slug}.mdx",
    fields: [
      { type: "string", name: "title", label: "Title" },
      { type: "string", name: "meta_title", label: "SEO title" },
      { type: "string", name: "description", label: "Meta description" },
      { type: "string", name: "slug", label: "Slug" },
      { type: "string", name: "image", label: "Hero image path" },
      { type: "string", name: "author", label: "Author" },
      { type: "date", name: "date", label: "Date" },
      {
        type: "list",
        name: "categories",
        label: "Categories",
        items: { type: "string" },
      },
      {
        type: "list",
        name: "references",
        label: "References",
        items: { type: "string" },
      },
      { type: "boolean", name: "draft", label: "Draft" },
    ],
  },

  // ----- Authors (data) -----
  {
    type: "data",
    name: "author",
    label: "Author",
    filePath: "src/content/authors/{slug}.md",
    exclude: "**/-index.md",
    fields: [
      { type: "string", name: "title", label: "Name" },
      { type: "string", name: "email", label: "Email" },
      { type: "string", name: "image", label: "Avatar path" },
      { type: "markdown", name: "description", label: "Bio" },
      {
        type: "object",
        name: "social",
        label: "Social",
        fields: [
          { type: "string", name: "facebook", label: "Facebook" },
          { type: "string", name: "twitter", label: "Twitter" },
          { type: "string", name: "instagram", label: "Instagram" },
        ],
      },
    ],
  },

  // ----- Site config (data) -----
  {
    type: "data",
    name: "siteConfig",
    label: "Site config",
    singleInstance: true,
    filePath: "src/config/config.json",
    fields: [
      {
        type: "object",
        name: "footer_data",
        label: "Footer",
        fields: [
          { type: "markdown", name: "description", label: "Description" },
          { type: "string", name: "email", label: "Email" },
          { type: "string", name: "location", label: "Address" },
          { type: "string", name: "phone", label: "Phone" },
        ],
      },
      {
        type: "object",
        name: "call_to_action",
        label: "Call to action band",
        fields: [
          { type: "boolean", name: "enable", label: "Enable" },
          { type: "string", name: "subtitle", label: "Subtitle" },
          { type: "string", name: "title", label: "Title" },
          { type: "markdown", name: "content", label: "Content" },
          {
            type: "object",
            name: "button",
            label: "Button",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "label_sml", label: "Short label" },
              { type: "string", name: "link", label: "Link" },
            ],
          },
        ],
      },
      {
        type: "object",
        name: "credentials",
        label: "Credential strip",
        fields: [
          { type: "boolean", name: "enable", label: "Enable" },
          { type: "string", name: "intro", label: "Intro line" },
          {
            type: "list",
            name: "items",
            label: "Credentials",
            items: {
              type: "object",
              fields: [
                { type: "string", name: "label", label: "Label" },
                { type: "string", name: "detail", label: "Detail" },
              ],
            },
          },
          {
            type: "object",
            name: "secondary_cta",
            label: "Secondary CTA",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "link", label: "Link" },
            ],
          },
        ],
      },
      {
        type: "object",
        name: "business",
        label: "Business (schema / NAP)",
        fields: [
          { type: "string", name: "name", label: "Name" },
          { type: "markdown", name: "description", label: "Description" },
          { type: "string", name: "street", label: "Street" },
          { type: "string", name: "suburb", label: "Suburb" },
          { type: "string", name: "state", label: "State" },
          { type: "string", name: "postcode", label: "Postcode" },
          { type: "string", name: "country", label: "Country code" },
          { type: "string", name: "phone", label: "Phone" },
          { type: "string", name: "url", label: "URL" },
        ],
      },
    ],
  },
];

// ---- Sitemap: map page documents to URLs ------------------------------------

const singletonUrls: Record<string, string> = {
  homepage: "/",
  about: "/about",
  patientJourney: "/patient-journey",
  bookAppointment: "/book-appointment",
  treatmentsIndex: "/non-surgical-treatments",
  conditionsIndex: "/conditions",
  resourcesIndex: "/patient-resources",
};

const collectionBase: Record<string, string> = {
  treatment: "/non-surgical-treatments",
  condition: "/conditions",
  resource: "/patient-resources",
};

function slugFromId(id: string): string {
  const file = id.split("/").pop() || "";
  return file.replace(/\.(md|mdx|json)$/i, "");
}

// ---- Config -----------------------------------------------------------------

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  ssgName: "custom",
  nodeVersion: "18",
  devCommand:
    "node_modules/.bin/astro dev --port {PORT} --host 127.0.0.1",
  experimental: {
    ssg: {
      name: "Astro",
      logPatterns: { up: ["is ready", "astro"] },
      passthrough: ["/vite-hmr/**"],
    },
  },
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["src/content", "src/config"],
      models,
      assetsConfig: {
        referenceType: "static",
        staticDir: "public",
        publicPath: "/",
        uploadDir: "images/uploads",
      },
    }),
  ],
  siteMap: ({ documents }): SiteMapEntry[] => {
    return documents
      .map((doc: any): SiteMapEntry | null => {
        const model = doc.modelName as string;
        if (singletonUrls[model]) {
          return {
            stableId: doc.id,
            urlPath: singletonUrls[model],
            document: doc,
            isHomePage: model === "homepage",
          } as SiteMapEntry;
        }
        if (collectionBase[model]) {
          return {
            stableId: doc.id,
            urlPath: `${collectionBase[model]}/${slugFromId(doc.id)}`,
            document: doc,
            isHomePage: false,
          } as SiteMapEntry;
        }
        return null;
      })
      .filter((e): e is SiteMapEntry => !!e);
  },
});
