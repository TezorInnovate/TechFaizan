import { defaultContent } from "@/lib/default-content";
import { createSupabaseClient } from "@/lib/supabase";
import type { ContentItem, PortfolioContent } from "@/lib/types";

export async function getPortfolioContent(): Promise<PortfolioContent> {
  const client = createSupabaseClient();
  if (!client) return defaultContent;
  try {
    const { data, error } = await client.from("portfolio_content").select("data").eq("id", "main").maybeSingle();
    if (error || !data?.data) return defaultContent;
    return data.data as PortfolioContent;
  } catch {
    return defaultContent;
  }
}

export function published(items: ContentItem[]) {
  return items.filter((item) => item.published);
}

export function bySlug(items: ContentItem[], slug: string) {
  return items.find((item) => item.slug === slug && item.published);
}

export function formatDateRange(item: ContentItem) {
  if (item.date) return item.date;
  if (item.startDate && item.endDate) return `${item.startDate} — ${item.endDate}`;
  return item.startDate || item.endDate || "";
}
