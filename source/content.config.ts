import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const DocsSchema = z.object({
    title: z.string(),
    text: z.string(),
});

type DocsCollectionEntry = {
    id: string;
    data: z.infer<typeof DocsSchema>;
};

export type DocsCollection = Array<DocsCollectionEntry>;

const docs = defineCollection({
    schema: DocsSchema,
    loader: () => [
        { id: '3', title: 'Star Wars', text: 'A long time ago in a galaxy far, far away...' },
        { id: '1', title: 'Romeo and Juliet', text: 'O Romeo, Romeo! wherefore art thou Romeo?' },
        { id: '2', title: 'A Tale of Two Cities', text: 'It was the best of times, it was the worst of times...' },
    ],
});

export const collections = { docs };
