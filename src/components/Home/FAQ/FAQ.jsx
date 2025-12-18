import { useState } from "react";

const faqs = [
  {
    q: 'What is AssetVerse?',
    a: 'It is a corporate asset management platform for HRs and employees.',
  },
  {
    q: 'Is there any free package?',
    a: 'Yes! HRs get a Basic package with 5 employee limit for free.',
  },
  {
    q: 'Can employees request assets?',
    a: 'Yes, employees can request assets directly from their dashboard.',
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="pb-20 pt-10">
      <div className="max-w-[60%] mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Frequently Asked Questions
        </h2>

        {faqs.map((item, i) => (
          <div key={i} className="border-b py-4 cursor-pointer">
            <h3
              className="text-lg text-gray-300 font-semibold flex justify-between"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {item.q}
              <span>{open === i ? '-' : '+'}</span>
            </h3>

            {open === i && <p className="mt-3 text-gray-400">{item.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
