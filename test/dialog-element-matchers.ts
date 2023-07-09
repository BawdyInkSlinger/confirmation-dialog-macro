import { Selector } from "testcafe";

export function dialogCount(): Promise<number> {
  return Selector("dialog").count;
}
