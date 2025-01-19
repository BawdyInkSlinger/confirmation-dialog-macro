import { Selector } from 'testcafe';
import { html_beautify } from 'js-beautify'
import { readFileSync, writeFileSync } from 'fs'

fixture.page(`../dist_test/index.html`)(`Dialog Element Macro`);

const readmePath = './README.md';

test(`HTML reference is synced with README.md`, async (t: TestController): Promise<void> => {
  await t.setNativeDialogHandler((type, text) => {
    throw new Error(text);
  });

  await t
    .click(
      Selector('.passage button').withText(
        `synced with README.md`
      )
    )
    .expect(Selector(`.passage h1`).innerText)
    .eql(`Test HTML reference is synced with README.md`)

  const wiki = await Selector(`#wiki-text`).innerText
  const formattedWiki = formatWiki(wiki);

  let readme = readFileSync(readmePath).toString()
  readme = replaceReadmeExampleCode(readme, formattedWiki);
  
  await t.click(
    Selector('.passage button').withText(
      `Open Dialog`
    )
  )

  const htmlSelector: CustomSelector = Selector(`dialog#example-id`).addCustomDOMProperties({
    outerHTML: el => el.outerHTML,
  }) as any;

  const html = await htmlSelector.outerHTML;
  const formattedHtml = html_beautify(html)
  readme = replaceReadmeExampleHTML(readme, formattedHtml);

  writeFileSync(readmePath, readme)
  // console.error(`formattedWiki\n`, formattedWiki, `\n\nformattedHtml\n`, formattedHtml);


});

interface CustomSelector extends Selector {
  outerHTML: Promise<string>;
}

function formatWiki(wiki: string) {
  return wiki.split(/[\n|\r]/g).map((line, index, arr) => {
    if (index === 0 || index === arr.length - 1) {
      return line;
    }
    if (/dialogelement/.test(line)) {
      return "  " + line;
    }
    return "    " + line;
  }).join('\n');
}

function replaceReadmeExampleCode(readme: string, wiki: string): string {
  return readme.replace(/(?<=^### Example Code\s*).*?(?=^#)/sm, '\n\n```\n' + wiki + '\n```\n\n'); // Returns multiple matches if any
}


function replaceReadmeExampleHTML(readme: string, html: string): string {
  return readme.replace(/(?<=^### Example's HTML\s*).*?(?=^#)/sm, '\n\n```\n' + html + '\n```\n\n'); // Returns multiple matches if any
}
