import PageHeader from './ui/PageHeader';

export default function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <PageHeader title={title} text="Last updated 1 November 2026. Wildway is a concept project: this page shows how the policy would read, it is not a legal document." crumbs={[{ label: title }]} seed={19} />
      <section className="wrap py-14 lg:py-20">
        <ol className="mx-auto flex max-w-[720px] flex-col gap-10">
          {sections.map((s, i) => (
            <li key={s.h} className="grid gap-3 sm:grid-cols-[3rem_1fr]">
              <span className="t-num pt-1 font-serif text-[1.25rem] text-ember-ink">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2 className="t-h4">{s.h}</h2>
                <p className="mt-3 leading-[1.7] text-ink-soft">{s.p}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
