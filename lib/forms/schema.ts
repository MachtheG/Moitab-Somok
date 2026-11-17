import { z } from "zod";

export const WARDS = ["chilchila", "kipkelion", "kamasian", "kunyak"] as const;
export const ROLES = ["canvass", "events", "digital", "agent", "transport"] as const;
export const KINDS = ["pledge", "volunteer", "contact"] as const;
export type FormKind = (typeof KINDS)[number];

/** Kenyan mobile: 07xx / 01xx, or +254 / 254 prefix. Spaces and dashes ignored. */
export const kenyanPhone = z
  .string()
  .transform((s) => s.replace(/[\s-]/g, ""))
  .refine((s) => /^(?:\+?254|0)(?:7|1)\d{8}$/.test(s), { message: "phone" })
  .transform((s) => s.replace(/^(?:\+?254|0)/, "+254"));

const base = {
  name: z.string().trim().min(2, "name").max(120, "name"),
  phone: kenyanPhone,
  email: z.union([z.literal(""), z.string().trim().email("email").max(200)]).optional(),
  ward: z.enum(WARDS, { message: "ward" }),
  consent: z.literal(true, { message: "consent" }),
  locale: z.enum(["en", "sw"]).default("en"),
  // Spam traps: must be empty / plausibly human.
  website: z.string().max(0).optional(),
  startedAt: z.coerce.number().optional(),
};

export const schemas = {
  pledge: z.object(base),
  volunteer: z.object({ ...base, roles: z.array(z.enum(ROLES)).max(ROLES.length).default([]) }),
  contact: z.object({ ...base, ward: z.enum(WARDS, { message: "ward" }), message: z.string().trim().min(5, "message").max(2000, "message") }),
} satisfies Record<FormKind, z.ZodTypeAny>;

export type Submission = { kind: FormKind; data: Record<string, unknown>; receivedAt: string };
