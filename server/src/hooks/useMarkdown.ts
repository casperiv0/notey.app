import marked from "marked";
import dompurify from "dompurify";

export default function (body: string): string {
  return dompurify.sanitize(marked(body));
}
