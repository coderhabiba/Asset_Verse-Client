const  Footer = () => {
  return (
    <footer className="footer p-10 bg-gray-900 text-gray-300 mt-12">
      <div>
        <span className="footer-title text-white">AssetVerse</span>
        <p>Manage your assets efficiently.</p>
        <p>
          &copy; {new Date().getFullYear()} AssetVerse. All rights reserved.
        </p>
      </div>
      <div>
        <span className="footer-title text-white">Quick Links</span>
        <a className="link link-hover" href="/">
          Home
        </a>
        <a className="link link-hover" href="/assets">
          Assets
        </a>
        <a className="link link-hover" href="/requests">
          Requests
        </a>
        <a className="link link-hover" href="/analytics">
          Analytics
        </a>
      </div>
      <div>
        <span className="footer-title text-white">Contact</span>
        <a className="link link-hover" href="mailto:support@assetverse.com">
          support@assetverse.com
        </a>
        <a className="link link-hover" href="tel:+1234567890">
          +88 01734 567 890
        </a>
        <div className="flex space-x-4 mt-2">
          <a href="#" className="link link-hover">
            Facebook
          </a>
          <a href="#" className="link link-hover">
            Twitter
          </a>
          <a href="#" className="link link-hover">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
