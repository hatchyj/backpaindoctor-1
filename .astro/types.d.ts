declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"about": {
"index.md": {
	id: "index.md";
  slug: "index";
  body: string;
  collection: "about";
  data: any
} & { render(): Render[".md"] };
};
"authors": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"abdullah-al-shifat.md": {
	id: "abdullah-al-shifat.md";
  slug: "abdullah-al-shifat";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"derick-barker.md": {
	id: "derick-barker.md";
  slug: "derick-barker";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
};
"blog": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"post-1.mdx": {
	id: "post-1.mdx";
  slug: "post-1";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"post-2.mdx": {
	id: "post-2.mdx";
  slug: "post-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"post-3.mdx": {
	id: "post-3.mdx";
  slug: "post-3";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"post-4.mdx": {
	id: "post-4.mdx";
  slug: "post-4";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"post-5.mdx": {
	id: "post-5.mdx";
  slug: "post-5";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"post-6.mdx": {
	id: "post-6.mdx";
  slug: "post-6";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"post-7.mdx": {
	id: "post-7.mdx";
  slug: "post-7";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"post-8.mdx": {
	id: "post-8.mdx";
  slug: "post-8";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
};
"careers": {
"-index.mdx": {
	id: "-index.mdx";
  slug: "-index";
  body: string;
  collection: "careers";
  data: InferEntrySchema<"careers">
} & { render(): Render[".mdx"] };
"job-post-1.md": {
	id: "job-post-1.md";
  slug: "job-post-1";
  body: string;
  collection: "careers";
  data: InferEntrySchema<"careers">
} & { render(): Render[".md"] };
"job-post-2.md": {
	id: "job-post-2.md";
  slug: "job-post-2";
  body: string;
  collection: "careers";
  data: InferEntrySchema<"careers">
} & { render(): Render[".md"] };
"job-post-3.md": {
	id: "job-post-3.md";
  slug: "job-post-3";
  body: string;
  collection: "careers";
  data: InferEntrySchema<"careers">
} & { render(): Render[".md"] };
"job-post-4.md": {
	id: "job-post-4.md";
  slug: "job-post-4";
  body: string;
  collection: "careers";
  data: InferEntrySchema<"careers">
} & { render(): Render[".md"] };
"job-post-5.md": {
	id: "job-post-5.md";
  slug: "job-post-5";
  body: string;
  collection: "careers";
  data: InferEntrySchema<"careers">
} & { render(): Render[".md"] };
"job-post-6.md": {
	id: "job-post-6.md";
  slug: "job-post-6";
  body: string;
  collection: "careers";
  data: InferEntrySchema<"careers">
} & { render(): Render[".md"] };
"job-post-7.md": {
	id: "job-post-7.md";
  slug: "job-post-7";
  body: string;
  collection: "careers";
  data: InferEntrySchema<"careers">
} & { render(): Render[".md"] };
};
"case-studies": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "case-studies";
  data: InferEntrySchema<"case-studies">
} & { render(): Render[".md"] };
"case-1.md": {
	id: "case-1.md";
  slug: "case-1";
  body: string;
  collection: "case-studies";
  data: InferEntrySchema<"case-studies">
} & { render(): Render[".md"] };
"case-2.md": {
	id: "case-2.md";
  slug: "case-2";
  body: string;
  collection: "case-studies";
  data: InferEntrySchema<"case-studies">
} & { render(): Render[".md"] };
"case-3.md": {
	id: "case-3.md";
  slug: "case-3";
  body: string;
  collection: "case-studies";
  data: InferEntrySchema<"case-studies">
} & { render(): Render[".md"] };
"case-4.md": {
	id: "case-4.md";
  slug: "case-4";
  body: string;
  collection: "case-studies";
  data: InferEntrySchema<"case-studies">
} & { render(): Render[".md"] };
"case-5.md": {
	id: "case-5.md";
  slug: "case-5";
  body: string;
  collection: "case-studies";
  data: InferEntrySchema<"case-studies">
} & { render(): Render[".md"] };
"case-6.md": {
	id: "case-6.md";
  slug: "case-6";
  body: string;
  collection: "case-studies";
  data: InferEntrySchema<"case-studies">
} & { render(): Render[".md"] };
};
"contact": {
"book-appointment.md": {
	id: "book-appointment.md";
  slug: "book-appointment";
  body: string;
  collection: "contact";
  data: any
} & { render(): Render[".md"] };
};
"explaining-pain": {
"index.md": {
	id: "index.md";
  slug: "index";
  body: string;
  collection: "explaining-pain";
  data: any
} & { render(): Render[".md"] };
};
"homepage": {
"index.md": {
	id: "index.md";
  slug: "index";
  body: string;
  collection: "homepage";
  data: any
} & { render(): Render[".md"] };
};
"how-it-works": {
"index.md": {
	id: "index.md";
  slug: "index";
  body: string;
  collection: "how-it-works";
  data: any
} & { render(): Render[".md"] };
};
"pages": {
"404.md": {
	id: "404.md";
  slug: "404";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".md"] };
"changelog.mdx": {
	id: "changelog.mdx";
  slug: "changelog";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdx"] };
"elements.mdx": {
	id: "elements.mdx";
  slug: "elements";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdx"] };
"terms-and-conditions.md": {
	id: "terms-and-conditions.md";
  slug: "terms-and-conditions";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".md"] };
};
"pricing": {
"index.md": {
	id: "index.md";
  slug: "index";
  body: string;
  collection: "pricing";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
