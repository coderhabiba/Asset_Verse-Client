import { useEffect, useState } from "react";
import useAxiosSecure from './../../../hooks/useAxiosSecure';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  
  useEffect(() => {
    setLoading(true);
    axiosSecure.get('/packages')
    .then(data => {
      setPackages(data.data);
    })
    .catch(err => {
      console.error('Failed to fetch packages:', err);
      setLoading(false);
    })
    setLoading(false)
  }, []);

    if (loading)
      return <p className="text-center py-10">Loading packages...</p>;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-primary mb-4">
          Choose Your Package
        </h2>
        <p className="text-gray-300 mb-12">
          Flexible subscription plans for every business size.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-[#0E131F] border border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-lg transform hover:-translate-y-4 transition duration-500 ease-out hover:bg-[#25134e4b] hover:border-[#5b0ed896]"
            >
              <h3 className="text-2xl font-semibold mb-1 text-gray-300">{pkg.name}</h3>
              <p className="text-gray-400 mb-2">
                Employee Limit: {pkg.employeeLimit}
              </p>
              <p className="text-3xl font-bold mb-4 text-primary">${pkg.price}</p>

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
