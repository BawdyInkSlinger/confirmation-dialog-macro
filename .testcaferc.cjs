module.exports = {
  "browsers": ["chrome:headless"],
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
    async expectSetContainsSubset(setPromise, subsetPromise) {
      const set = await setPromise;
      const subset = await subsetPromise;

      if (typeof subset === 'string') {
        await this.expect(set.includes(subset))
          .ok(`${JSON.stringify(set)} did not contain every element of ${JSON.stringify(subset)}`);
      } else { // assumed to be an array
        await this.expect(subset.every((subsetElement) => set.includes(subsetElement)))
          .ok(`${JSON.stringify(set)} did not contain every element of ${JSON.stringify(subset)}`);
      }
    },
  }
}