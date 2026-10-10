"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { MediaItem } from "@/lib/types";

export function MediaGallery({ media }: { media: MediaItem[] }) {
  const [active, setActive] = useState(0);
  if (!media.length) return null;
  const current = media[active];
  const move = (direction: number) => setActive((value) => (value + direction + media.length) % media.length);
  return <section className="media-gallery" aria-label="Project media gallery">
    <div className="gallery-stage">
      {current.type === "video" ? <video src={current.url} controls preload="metadata" aria-label={current.alt} /> : <img src={current.url} alt={current.alt} />}
      {media.length > 1 ? <><button onClick={() => move(-1)} className="gallery-control previous" aria-label="Previous media"><ChevronLeft /></button><button onClick={() => move(1)} className="gallery-control next" aria-label="Next media"><ChevronRight /></button></> : null}
    </div>
    <div className="gallery-caption"><span>{String(active + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}</span><p>{current.caption || current.alt}</p></div>
    {media.length > 1 ? <div className="gallery-thumbs">{media.map((item, index) => <button key={item.id} className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-label={`Show ${item.caption || item.alt}`}>{item.type === "video" ? <span><Play /></span> : <img src={item.url} alt="" />}</button>)}</div> : null}
  </section>;
}
