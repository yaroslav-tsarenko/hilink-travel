import PageHeader from './ui/PageHeader';

export default function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <PageHeader title={title} text="Last updated: November 2025" crumbs={[{ label: title }]} />
      <section className="max-container padding-container pb-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          {sections.map((s, i) => (
            <div key={s.h}>
              <h2 className="bold-24 mb-3">{i + 1}. {s.h}</h2>
              <p className="regular-16 leading-relaxed text-gray-50">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
