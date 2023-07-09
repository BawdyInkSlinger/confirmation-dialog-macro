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
    ]
}