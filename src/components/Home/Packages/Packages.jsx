import { useEffect, useState } from "react";



const Packages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch('http://localhost:3000/packages')
        .then(res => res.json())
        .then(data => {
          setPackages(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch packages:', err);
          setLoading(false);
        });
    }, []);

    if (loading)
      return <p className="text-center py-10">Loading packages...</p>;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-100 mb-4">Choose Your Package</h2>
        <p className="text-gray-300 mb-12">
          Flexible subscription plans for every business size.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transform hover:-translate-y-3 transition duration-500"
            >
              <h3 className="text-2xl font-semibold mb-4">{pkg.name}</h3>
              <p className="text-gray-500 mb-2">
                Employee Limit: {pkg.employeeLimit}
              </p>
              <p className="text-3xl font-bold mb-4">${pkg.price}</p>

              <ul className="text-gray-600 mb-6 space-y-2">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-2 text-green-500">✔</span> {feature}
                  </li>
                ))}
              </ul>

              <button className="btn btn-primary w-full">Choose Plan</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
