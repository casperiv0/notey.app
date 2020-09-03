import marked from "marked";
import createDompurify from "dompurify";
import { JSDOM } from "jsdom";

/* Thanks to: https://github.com/cure53/DOMPurify/issues/437#issuecomment-632021941 */
const window = (new JSDOM("<!DOCTYPE html>").window as unknown) as Window;
const dompurify = createDompurify(window);

export default function (body: string): string {
  return dompurify.sanitize(marked(body));
}
