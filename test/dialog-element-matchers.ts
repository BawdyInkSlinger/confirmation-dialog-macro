import { Selector } from "testcafe";

export function dialogCount(): Promise<number> {
  return Selector("dialog").count;
}

export function dialogTitle(): Promise<string> {
    return Selector(".passage .macro-dialogelement .dialog-element-title").innerText
}