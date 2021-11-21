import { marked } from "marked";
import createDompurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("<!DOCTYPE html>").window as unknown as Window;
const dompurify = createDompurify(window);

export function sanitizeUserMarkdown(body: string): string {
  return dompurify.sanitize(marked.parse(body));
}
