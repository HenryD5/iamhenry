import "server-only";

import { Resend } from "resend";

import { envContact } from "@/shared/utils/env-server";

import { contactEmailSchema } from "../schemas/contact.schema";
import { hasLineBreak } from "../utils/header-text";

// Asunto fijo: ningún dato del visitante llega a las cabeceras salvo
// `replyTo`, y solo si el correo limpio vuelve a validar.
const CONTACT_SUBJECT = "Nuevo mensaje de contacto";

export type SendContactEmailInput = {
  name: string;
  email: string;
  message: string;
};

export type SendContactEmailResult = "sent" | "unavailable";

let resendClient: Resend | undefined;

const getResend = (apiKey: string) => {
  resendClient ??= new Resend(apiKey);
  return resendClient;
};

export const sendContactEmail = async ({
  name,
  email,
  message,
}: SendContactEmailInput): Promise<SendContactEmailResult> => {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = envContact;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return "unavailable";
  }

  if (hasLineBreak(email) || hasLineBreak(name)) {
    return "unavailable";
  }

  const replyTo = contactEmailSchema.safeParse(email);

  try {
    // Solo `text`: el cuerpo es texto plano con etiquetas fijas y nunca se
    // interpreta como HTML.
    const { error } = await getResend(RESEND_API_KEY).emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      ...(replyTo.success ? { replyTo: replyTo.data } : {}),
      subject: CONTACT_SUBJECT,
      text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("contact: resend rejected the email");
      return "unavailable";
    }

    return "sent";
  } catch {
    console.error("contact: resend request failed");
    return "unavailable";
  }
};
