import { assertStrictEquals } from '@std/assert';

const baseUrl = 'http://localhost:8085';

const responses: Array<Response> = [];

async function get(url = ''): Promise<Response> {
    url = new URL(url, baseUrl).href;

    const response = await fetch(new Request(url));
    responses.push(response);

    return response;
}

Deno.test('a robots.txt file is accessible', async () => {
    const r = await get('robots.txt');
    assertStrictEquals(r.status, 200);
    await closeResponses();
});

Deno.test('a sitemap is accessible', async () => {
    const r = await get('sitemap-index.xml');
    assertStrictEquals(r.status, 200);
    await closeResponses();
});

Deno.test('the root page is accessible', async () => {
    const r = await get('');
    assertStrictEquals(r.status, 200);
    await closeResponses();
});

Deno.test('close all responses', async () => {
    await closeResponses();
});

async function closeResponses(): Promise<void> {
    for await (const r of responses) {
        if (!r.bodyUsed) {
            await r.body?.cancel();
        }
    }

    responses.length = 0;
}
