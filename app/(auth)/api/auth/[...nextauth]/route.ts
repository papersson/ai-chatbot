// Explicitly set runtime to nodejs and disable edge runtime
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";

import { handlers } from "@/app/(auth)/auth"
export const { GET, POST } = handlers
