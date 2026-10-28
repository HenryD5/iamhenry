// Lectura del FormData con lista cerrada de claves. Las claves desconocidas
// (incluidas las `$ACTION_*` del framework) se ignoran; cualquier valor que
// no sea texto (File o Blob) en una clave permitida invalida el envío.

export const CONTACT_FORM_KEYS = [
  "name",
  "email",
  "message",
  "website",
  "startedAt",
  "cf-turnstile-response",
  "turnstileToken",
] as const;

export type ContactFormKey = (typeof CONTACT_FORM_KEYS)[number];

export type ContactFormFields = Record<ContactFormKey, string>;

export type ReadContactFormResult =
  | { isValid: true; fields: ContactFormFields }
  | { isValid: false; nonTextKeys: ContactFormKey[] };

export function readContactFormData(formData: FormData): ReadContactFormResult {
  const fields = {} as ContactFormFields;
  const nonTextKeys: ContactFormKey[] = [];

  for (const key of CONTACT_FORM_KEYS) {
    const values = formData.getAll(key);

    if (values.some((value) => typeof value !== "string")) {
      nonTextKeys.push(key);
    }

    const [first] = values;
    // Clave repetida: vale la primera, como `FormData.get`.
    fields[key] = typeof first === "string" ? first : "";
  }

  return nonTextKeys.length > 0
    ? { isValid: false, nonTextKeys }
    : { isValid: true, fields };
}
