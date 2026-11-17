import { describe, expect, it } from "vitest";
import { kenyanPhone, schemas } from "@/lib/forms/schema";

const ok = { name: "Test Voter", phone: "0712 345 678", ward: "kunyak", consent: true };

describe("form schemas", () => {
  it("normalises Kenyan phones", () => {
    expect(kenyanPhone.parse("0712 345 678")).toBe("+254712345678");
    expect(kenyanPhone.parse("+254 110 123456")).toBe("+254110123456");
    expect(kenyanPhone.safeParse("0812345678").success).toBe(false);
  });
  it("requires explicit consent", () => {
    expect(schemas.pledge.safeParse(ok).success).toBe(true);
    expect(schemas.pledge.safeParse({ ...ok, consent: false }).success).toBe(false);
  });
  it("rejects filled honeypot", () => {
    expect(schemas.pledge.safeParse({ ...ok, website: "spam" }).success).toBe(false);
  });
  it("contact needs a message", () => {
    expect(schemas.contact.safeParse({ ...ok, message: "" }).success).toBe(false);
    expect(schemas.contact.safeParse({ ...ok, message: "Habari, tunaomba barabara." }).success).toBe(true);
  });
});
