const { Selector } = require("testcafe");

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
        async expectDialogCountToBe(dialogCount) {
            await this.expect(Selector(".passage .macro-dialogelement.dialog-element").count)
                .eql(dialogCount)
                .expect(
                    Selector(".passage .macro-dialogelement .dialog-element-title").count
                )
                .eql(dialogCount);
        },
        async expectDialogTitleToBe(dialogTitle) {
            await this.expect(
                Selector(".passage .macro-dialogelement .dialog-element-title").innerText
            )
                .eql(dialogTitle)
        },
    }
}