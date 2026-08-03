"use client";

import { useEffect, useRef, useState } from "react";
import { useUi } from "@/components/providers/UiProvider";

const defaults = ["रोजगार", "सीप", "लोक सेवा", "वैदेशिक रोजगार", "आईटी", "तालिम"];
export function SearchOverlay() {
  const { searchOpen, closeSearch } = useUi();
  const [terms, setTerms] = useState(defaults);
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { if (searchOpen) setTimeout(() => input.current?.focus(), 0); }, [searchOpen]);
  if (!searchOpen) return null;
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (!query.trim()) return input.current?.focus(); setTerms((items) => [query, ...items.filter((item) => item !== query)].slice(0, 8)); closeSearch(); document.getElementById("stories")?.scrollIntoView({ behavior: "smooth" }); };
  return <div className="search-overlay is-open" id="search-overlay" role="dialog" aria-modal="true" aria-labelledby="search-dialog-title" onClick={(event) => { if (event.target === event.currentTarget) closeSearch(); }}><div className="search-overlay__panel"><button className="search-overlay__close" type="button" aria-label="बन्द गर्नुहोस्" onClick={closeSearch}><i className="fa-solid fa-xmark" aria-hidden="true" /></button><h2 className="sr-only" id="search-dialog-title">खोज</h2><form className="search-box" role="search" onSubmit={submit}><label className="sr-only" htmlFor="site-search">किवर्ड खोज्नुहोस्</label><span className="search-box__icon" aria-hidden="true"><i className="fa-solid fa-magnifying-glass" /></span><input ref={input} id="site-search" type="search" name="q" placeholder="किवर्ड लेख्नुहोस्…" required autoComplete="off" value={query} onChange={(event) => setQuery(event.target.value)} /><button className="search-box__submit" type="submit">खोज्नुहोस् <i className="fa-solid fa-arrow-right" aria-hidden="true" /></button></form><div className="search-recent"><h3 className="search-recent__heading">हालैका खोज</h3><div className="search-recent__list">{terms.map((term) => <button type="button" className="search-chip" key={term} onClick={() => { setQuery(term); input.current?.focus(); }}>{term}</button>)}</div></div></div></div>;
}
