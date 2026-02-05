import { assertStrictEquals } from '@std/assert';

const baseUrl = 'http://localhost:8085';

const responses: Array<Response> = [];

//#region tests
Deno.test.afterEach(async () => {
    await closeResponses();
});

Deno.test('a robots.txt file is accessible', async () => {
    const r = await get('robots.txt');
    assertStrictEquals(r.status, 200);
});

Deno.test('a sitemap is accessible', async () => {
    const r = await get('sitemap-index.xml');
    assertStrictEquals(r.status, 200);
});

Deno.test('the root page is accessible', async () => {
    const r = await get('');
    assertStrictEquals(r.status, 200);
});
//#endregion

//#region helpers
async function get(url = ''): Promise<Response> {
    url = new URL(url, baseUrl).href;

    const response = await fetch(new Request(url));
    responses.push(response);

    return response;
}

async function closeResponses(): Promise<void> {
    for await (const r of responses) {
        if (!r.bodyUsed) {
            await r.body?.cancel();
        }
    }

    responses.length = 0;
}
//#endregion
