import { z } from "zod";

export interface UserContext {
  id: string;
  email: string;
  name: string;
  role: "OWNER" | "MANAGER" | "FRONT_DESK" | "FINANCE" | "HOUSEKEEPING";
}

export interface Ctx {
  user: UserContext;
  propertyId: string;
  now: Date;
}

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; code: string; message: string; fields?: Record<string, string[]> };

export function ok<T>(data: T): Result<T> {
  return { ok: true, data };
}

export function fail(code: string, message: string, fields?: Record<string, string[]>): Result<never> {
  return { ok: false, code, message, fields };
}

export async function getCtx(): Promise<Ctx> {
  // Mock / default context for Phase 0-1
  return {
    user: {
      id: "usr_noor",
      email: "owner@demo.test",
      name: "Noor",
      role: "OWNER",
    },
    propertyId: "prop_skyline",
    now: new Date(),
  };
}

export function action<I, O>(opts: {
  permission?: string;
  schema: z.ZodType<I>;
  run: (ctx: Ctx, input: I) => Promise<O>;
}) {
  return async (raw: unknown): Promise<Result<O>> => {
    const ctx = await getCtx();
    const parsed = opts.schema.safeParse(raw);
    if (!parsed.success) {
      return fail("VALIDATION", "Validasi data gagal", parsed.error.flatten().fieldErrors as Record<string, string[]>);
    }
    try {
      const result = await opts.run(ctx, parsed.data);
      return ok(result);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Terjadi kesalahan internal";
      return fail("INTERNAL", message);
    }
  };
}
