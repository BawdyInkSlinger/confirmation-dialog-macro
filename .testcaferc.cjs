module.exports = {
    "browsers": ["firefox:headless"],
    "reporter": {
        "name": "spec-time"
    },
    "screenshots": {
        "takeOnFails": true,
        "fullPage": true
    },
    "concurrency": 3,
    "clientScripts": [
        {
            "path": "test/testcafe-client-scripts/jquery-3.6.0.min.js"
        },
        {
            "path": "test/testcafe-client-scripts/scriptContent.js"
        }
    ],
    "customActions": {
        async expectContainsSubset(setPromise, subsetPromise) {
            const set = await setPromise;
            const subset = await subsetPromise;
            await this.expect(subset.every((subsetElement) => set.includes(subsetElement)))
                .ok(`${JSON.stringify(set)} did not contain every element of ${JSON.stringify(subset)}`);
        },
    }
}