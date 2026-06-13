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
"2026-06-13.md": {
	id: "2026-06-13.md";
  slug: "2026-06-13";
  body: string;
  collection: "about";
  data: any
} & { render(): Render[".md"] };
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
"dr-joshua-hatch.md": {
	id: "dr-joshua-hatch.md";
  slug: "dr-joshua-hatch";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
};
"conditions": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "conditions";
  data: any
} & { render(): Render[".md"] };
"achilles-tendinopathy.md": {
	id: "achilles-tendinopathy.md";
  slug: "achilles-tendinopathy";
  body: string;
  collection: "conditions";
  data: any
} & { render(): Render[".md"] };
"greater-trochanteric-pain-syndrome.md": {
	id: "greater-trochanteric-pain-syndrome.md";
  slug: "greater-trochanteric-pain-syndrome";
  body: string;
  collection: "conditions";
  data: any
} & { render(): Render[".md"] };
"hamstring-tendinopathy.md": {
	id: "hamstring-tendinopathy.md";
  slug: "hamstring-tendinopathy";
  body: string;
  collection: "conditions";
  data: any
} & { render(): Render[".md"] };
"knee-osteoarthritis.md": {
	id: "knee-osteoarthritis.md";
  slug: "knee-osteoarthritis";
  body: string;
  collection: "conditions";
  data: any
} & { render(): Render[".md"] };
"low-back-pain.md": {
	id: "low-back-pain.md";
  slug: "low-back-pain";
  body: string;
  collection: "conditions";
  data: any
} & { render(): Render[".md"] };
"plantar-fasciitis.md": {
	id: "plantar-fasciitis.md";
  slug: "plantar-fasciitis";
  body: string;
  collection: "conditions";
  data: any
} & { render(): Render[".md"] };
"rotator-cuff-shoulder-pain.md": {
	id: "rotator-cuff-shoulder-pain.md";
  slug: "rotator-cuff-shoulder-pain";
  body: string;
  collection: "conditions";
  data: any
} & { render(): Render[".md"] };
"sciatica.md": {
	id: "sciatica.md";
  slug: "sciatica";
  body: string;
  collection: "conditions";
  data: any
} & { render(): Render[".md"] };
"tennis-golfers-elbow.md": {
	id: "tennis-golfers-elbow.md";
  slug: "tennis-golfers-elbow";
  body: string;
  collection: "conditions";
  data: any
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
"homepage": {
"index.md": {
	id: "index.md";
  slug: "index";
  body: string;
  collection: "homepage";
  data: any
} & { render(): Render[".md"] };
};
"non-surgical-treatments": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "non-surgical-treatments";
  data: any
} & { render(): Render[".md"] };
"emtt-magnetotransduction.md": {
	id: "emtt-magnetotransduction.md";
  slug: "emtt-magnetotransduction";
  body: string;
  collection: "non-surgical-treatments";
  data: any
} & { render(): Render[".md"] };
"nerve-therapy-treatment.md": {
	id: "nerve-therapy-treatment.md";
  slug: "nerve-therapy-treatment";
  body: string;
  collection: "non-surgical-treatments";
  data: any
} & { render(): Render[".md"] };
"platelet-rich-plasma-treatment.md": {
	id: "platelet-rich-plasma-treatment.md";
  slug: "platelet-rich-plasma-treatment";
  body: string;
  collection: "non-surgical-treatments";
  data: any
} & { render(): Render[".md"] };
"prolotherapy-treatment.md": {
	id: "prolotherapy-treatment.md";
  slug: "prolotherapy-treatment";
  body: string;
  collection: "non-surgical-treatments";
  data: any
} & { render(): Render[".md"] };
"shockwave-therapy-eswt.md": {
	id: "shockwave-therapy-eswt.md";
  slug: "shockwave-therapy-eswt";
  body: string;
  collection: "non-surgical-treatments";
  data: any
} & { render(): Render[".md"] };
"trigger-point-therapy-treatment.md": {
	id: "trigger-point-therapy-treatment.md";
  slug: "trigger-point-therapy-treatment";
  body: string;
  collection: "non-surgical-treatments";
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
};
"patient-journey": {
"index.md": {
	id: "index.md";
  slug: "index";
  body: string;
  collection: "patient-journey";
  data: any
} & { render(): Render[".md"] };
};
"patient-resources": {
"-index.md": {
	id: "-index.md";
  slug: "-index";
  body: string;
  collection: "patient-resources";
  data: InferEntrySchema<"patient-resources">
} & { render(): Render[".md"] };
"cortisone-vs-prp-for-knee-osteoarthritis.mdx": {
	id: "cortisone-vs-prp-for-knee-osteoarthritis.mdx";
  slug: "cortisone-vs-prp-for-knee-osteoarthritis";
  body: string;
  collection: "patient-resources";
  data: InferEntrySchema<"patient-resources">
} & { render(): Render[".mdx"] };
"do-you-need-an-mri-for-back-pain.mdx": {
	id: "do-you-need-an-mri-for-back-pain.mdx";
  slug: "do-you-need-an-mri-for-back-pain";
  body: string;
  collection: "patient-resources";
  data: InferEntrySchema<"patient-resources">
} & { render(): Render[".mdx"] };
"post-1.mdx": {
	id: "post-1.mdx";
  slug: "the-relationship-between-sleep-and-pain-evidenced-based-strategies";
  body: string;
  collection: "patient-resources";
  data: InferEntrySchema<"patient-resources">
} & { render(): Render[".mdx"] };
"post-10-explaining-pain.mdx": {
	id: "post-10-explaining-pain.mdx";
  slug: "explaining-pain-a-5-minute-animation";
  body: string;
  collection: "patient-resources";
  data: InferEntrySchema<"patient-resources">
} & { render(): Render[".mdx"] };
"post-2.mdx": {
	id: "post-2.mdx";
  slug: "knee-pain-and-arthritis";
  body: string;
  collection: "patient-resources";
  data: InferEntrySchema<"patient-resources">
} & { render(): Render[".mdx"] };
"post-3.mdx": {
	id: "post-3.mdx";
  slug: "the-complexity-of-the-human-musculoskeletal-system-and-pain-mechanisms";
  body: string;
  collection: "patient-resources";
  data: InferEntrySchema<"patient-resources">
} & { render(): Render[".mdx"] };
"post-4.mdx": {
	id: "post-4.mdx";
  slug: "biomechanics-causes-and-treatments-of-back-pain";
  body: string;
  collection: "patient-resources";
  data: InferEntrySchema<"patient-resources">
} & { render(): Render[".mdx"] };
"post-5.mdx": {
	id: "post-5.mdx";
  slug: "understanding-the-causes-symptoms-and-treatments";
  body: string;
  collection: "patient-resources";
  data: InferEntrySchema<"patient-resources">
} & { render(): Render[".mdx"] };
"post-6.mdx": {
	id: "post-6.mdx";
  slug: "tennis-elbow-causes-symptoms-and-effective-treatment-strategies";
  body: string;
  collection: "patient-resources";
  data: InferEntrySchema<"patient-resources">
} & { render(): Render[".mdx"] };
"post-7.mdx": {
	id: "post-7.mdx";
  slug: "wrist-pain-exploring-the-causes-symptoms-and-treatment-options";
  body: string;
  collection: "patient-resources";
  data: InferEntrySchema<"patient-resources">
} & { render(): Render[".mdx"] };
"post-8.mdx": {
	id: "post-8.mdx";
  slug: "hip-pain-causes-symptoms-and-treatment-options";
  body: string;
  collection: "patient-resources";
  data: InferEntrySchema<"patient-resources">
} & { render(): Render[".mdx"] };
"post-9.mdx": {
	id: "post-9.mdx";
  slug: "shoulder-pain-causes-symptoms-and-effective-treatment-strategies";
  body: string;
  collection: "patient-resources";
  data: InferEntrySchema<"patient-resources">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
