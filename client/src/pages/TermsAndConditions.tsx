export default function TermsAndConditions() {
  return (
    <div className="min-h-screen py-12 px-6 md:px-20">
      <div className="max-w-5xl mx-auto bg-white shadow-lg bg-white/60 backdrop-blur-md rounded-xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
          Terms and Conditions
        </h1>

        <p className="text-gray-700 mb-4">
          By accessing and using{" "}
          <span className="font-semibold">
            <span className="text-[#69320a]">Bhoomi</span>
            <span className="text-green-700">बंधु</span>
          </span>
          , you agree to the following terms and conditions. Please read them
          carefully before using our services.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-3">
          1. Use of Services
        </h2>
        <p className="text-gray-700 mb-3">
          Our platform provides advisory and information services including
          weather updates, crop advisory, disease detection, and government
          schemes. These are for informational purposes only and should not be
          considered as a substitute for professional agricultural consultation.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-3">
          2. Data Privacy
        </h2>
        <p className="text-gray-700 mb-3">
          We value your privacy. Any data you provide (such as location or crop
          details) will be used only for enhancing your experience and will not
          be sold or misused.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-3">
          3. Accuracy of Information
        </h2>
        <p className="text-gray-700 mb-3">
          While we strive to provide accurate and updated information,
          Bhoomiबंधु does not guarantee 100% accuracy of weather forecasts,
          government schemes, or crop advisories.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-3">
          4. Limitation of Liability
        </h2>
        <p className="text-gray-700 mb-3">
          Bhoomiबंधु will not be held responsible for any losses or damages
          resulting from reliance on the information provided on this platform.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-3">
          5. Changes to Terms
        </h2>
        <p className="text-gray-700 mb-3">
          We reserve the right to update these terms and conditions at any time.
          Continued use of our platform indicates your acceptance of any
          changes.
        </p>

        <p className="text-gray-700 mt-6">
          If you have any questions about these Terms, please contact us at{" "}
          <a
            href="mailto:support@bb.com"
            className="text-green-600 hover:underline"
          >
            support@bb.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
