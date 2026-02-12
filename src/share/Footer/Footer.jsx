const Footer = () => {
  const footerSections = [
    {
      title: "Explore Vrbo",
      links: [
        { name: "List your property", href: "/list" },
        { name: "VrboCare™", href: "/vrbocare" },
        { name: "Trust and safety", href: "/trust-safety" },
        { name: "Partner resources", href: "/partner-resources" },
        { name: "Vacation rental guides", href: "/guides" },
        { name: "One Key credit cards", href: "/one-key-cards" },
        { name: "Vrbo Travel Insurance", href: "/travel-insurance" },
        { name: "Advertising", href: "/advertising" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Affiliates", href: "/affiliates" },
        { name: "Newsroom", href: "/newsroom" },
        { name: "One Key™ terms and conditions", href: "/one-key-terms" },
        { name: "Terms and conditions", href: "/terms" },
        { name: "Privacy policy", href: "/privacy" },
        { name: "Cookie Statement", href: "/cookies" },
        { name: "Your Privacy Choices", href: "/privacy-choices" },
        { name: "Content guidelines and reporting content", href: "/content-guidelines" },
      ],
    },
    {
      title: "Meet the Vrbo family",
      links: [
        { name: "Vrbo", href: "https://www.vrbo.com" },
        { name: "Abritel.fr", href: "https://www.abritel.fr" },
        { name: "FeWo-direkt.de", href: "https://www.fewo-direkt.de" },
        { name: "Bookabach.co.nz", href: "https://www.bookabach.co.nz" },
        { name: "Stayz.com.au", href: "https://www.stayz.com.au" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      {/* Logo Section */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-12 pb-6">
        <div className="mb-8">
          <img 
            src="https://www.vrbo.com/_dms/header/logo.svg?locale=en_US&siteid=9001001&2" 
            alt="Vrbo Logo" 
            className="h-8 md:h-10"
          />
        </div>

        {/* Footer Links - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-gray-900 font-semibold text-base mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-300 pt-6">
          <p className="text-gray-600 text-xs md:text-sm">
            © 2026 Vrbo, an Expedia Group company. All rights reserved. Vrbo and the Vrbo logo are trademarks or registered trademarks of HomeAway.com, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;