const  Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">AssetVerse</h2>
          <p>Manage your company assets efficiently and transparently.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Quick Links</h3>
          <ul>
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/assets" className="hover:text-white">
                Assets
              </a>
            </li>
            <li>
              <a href="/requests" className="hover:text-white">
                Requests
              </a>
            </li>
            <li>
              <a href="/analytics" className="hover:text-white">
                Analytics
              </a>
            </li>
            <li>
              <a href="/profile" className="hover:text-white">
                Profile
              </a>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Contact Us</h3>
          <p>Email: support@assetverse.com</p>
          <p>Phone: +1 234 567 890</p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-white">
              Facebook
            </a>
            <a href="#" className="hover:text-white">
              Twitter
            </a>
            <a href="#" className="hover:text-white">
              LinkedIn
            </a>
            <a href="#" className="hover:text-white">
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} AssetVerse. All rights reserved.
      </div>
    </footer>
  );
}
export default Footer;
