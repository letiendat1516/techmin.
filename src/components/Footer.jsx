const footerLinks = [
  { label: "Dịch vụ", href: "services" },
  { label: "Quy trình", href: "process" },
  { label: "Lợi ích", href: "benefits" },
];

const Footer = () => {
  return (
    <footer className="border-t border-apple-gray-4/60">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-base font-semibold text-apple-gray-1">
              TechMin<span className="text-apple-blue">.</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-apple-gray-3">
              Startup công nghệ chuyên thi công phần mềm quản lý theo yêu cầu cho cá nhân và doanh nghiệp.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-apple-gray-3">Điều hướng</p>
            <ul className="mt-3 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={`#${link.href}`} className="text-sm text-apple-gray-2 transition-colors hover:text-apple-gray-1">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-apple-gray-3">Liên hệ</p>
            <ul className="mt-3 space-y-2 text-sm text-apple-gray-2">
              <li>Điện thoại: +84 123 456 789</li>
              <li>Zalo: +84 123 456 789</li>
              <li>
                <a href="mailto:hello@devstudio.vn" className="transition-colors hover:text-apple-blue">
                  hello@devstudio.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-apple-gray-4/60 pt-6 text-center text-xs text-apple-gray-3">
          © {new Date().getFullYear()} TechMin. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
