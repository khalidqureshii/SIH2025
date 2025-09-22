// import { a } from "react-router-dom";

// export default function Footer() {
//   return (
//     <footer className="bg-gray-100 border-t border-gray-200 mt-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
//         {/* Left side: Logo + Brand Name */}
//         <div className="flex items-center space-x-2">
//           <img
//             src="plant.png"
//             alt="AgriAssist Logo"
//             className="w-8 h-8 object-contain"
//           />
//           <span className="text-lg font-semibold text-green-800">
//             Bhoomiबंधु
//           </span>
//         </div>

//         {/* Right side: Links */}
//         <div className="flex flex-wrap justify-center sm:justify-end gap-6 text-sm">
//           <Link
//             to="/feedback"
//             className="text-green-700 font-medium hover:text-green-800 transition"
//           >
//             Feedback
//           </a>
//           <Link
//             to="/about"
//             className="text-gray-600 hover:text-green-600 transition"
//           >
//             About Us
//           </a>
//           <Link
//             to="/terms"
//             className="text-gray-600 hover:text-green-600 transition"
//           >
//             Terms & Conditions
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// }

// import { a } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {

  const {t} = useTranslation();

  return (
    <footer className="bg-gradient-to-r from-green-600 to-green-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Branding */}
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-xl font-bold tracking-wide">Bhoomiबंधु</h2>
          <p className="text-sm text-gray-200">
            {t("footer.description")}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 text-sm">
          <span>
            <a
              href="/feedback"
              className="hover:underline font-semibold text-green-200"
            >
              {t("footer.links.feedback")}
            </a>
          </span>
          <span>
            <a href="/about" className="hover:underline">
              {t("footer.links.about_us")}
            </a>
          </span>
          <span>
            <a href="/terms" className="hover:underline">
              {t("footer.links.terms_conditions")}
            </a>
          </span>
          <span>
            <a href="/privacy" className="hover:underline">
              {t("footer.links.privacy_policy")}
            </a>
          </span>
        </div>

        {/* Social + Contact */}
        <div className="flex flex-col gap-3 text-sm">
          <p className="font-semibold">{t("footer.connect.title")}</p>
          <div className="flex gap-3">
            <a href="#" className="hover:text-green-300">
              <Facebook size={18} />
            </a>
            <a href="#" className="hover:text-green-300">
              <Instagram size={18} />
            </a>
            <a href="#" className="hover:text-green-300">
              <Linkedin size={18} />
            </a>
            <a href="#" className="hover:text-green-300">
              <Twitter size={18} />
            </a>
          </div>
          <p>{t("footer.connect.email")} support@bb.com</p>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-green-600 mt-6 pt-4 text-center text-xs text-gray-300">
        © {new Date().getFullYear()} Bhoomiबंधु. {t("footer.copyright")}
      </div>
    </footer>
  );
};

export default Footer;
