export function PageHeading({ number, label, title, description }: { number: string; label: string; title: string; description: string }) {
  return <section className="inner-hero reveal-in"><div className="eyebrow">{number} / {label}</div><h1>{title}</h1><p>{description}</p></section>;
}