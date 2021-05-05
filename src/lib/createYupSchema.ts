import * as yup from "yup";

export type YupSchema = Record<string, yup.AnySchema>;

export function createYupSchema(...objs: YupSchema[]) {
  const merged = objs.reduce((all, curr) => ({ ...all, ...curr }), {});

  return yup.object().shape(merged);
}
