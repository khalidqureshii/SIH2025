import { useTranslation } from "react-i18next";

export default function TermsAndConditions() {

  const {t} = useTranslation();

  return (
    <div className="min-h-screen py-12 md:px-20">
      <div className="max-w-5xl mx-auto bg-white shadow-lg bg-white/60 backdrop-blur-md rounded-none md:rounded-xl lg:rounded-xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
          {t("terms_conditions.header.title")}
        </h1>

        <p className="text-gray-700 mb-4">
          {t("terms_conditions.header.description.p1")}{" "}
          <span className="font-semibold">
            <span className="text-[#69320a]">Bhoomi</span>
            <span className="text-green-700">बंधु</span>
          </span>
            {t("terms_conditions.header.description.p2")}
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-3">
          {t("terms_conditions.terms.titles.use_of_services")}
        </h2>
        <p className="text-gray-700 mb-3">
          {t("terms_conditions.terms.descriptions.use_of_services")}
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-3">
          {t("terms_conditions.terms.titles.data_privacy")}
        </h2>
        <p className="text-gray-700 mb-3">
          {t("terms_conditions.terms.descriptions.data_privacy")}
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-3">
          {t("terms_conditions.terms.titles.accuracy_of_information")}
        </h2>
        <p className="text-gray-700 mb-3">
          {t("terms_conditions.terms.descriptions.accuracy_of_information")}
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-3">
          {t("terms_conditions.terms.titles.limitation_of_liability")}
        </h2>
        <p className="text-gray-700 mb-3">
          {t("terms_conditions.terms.descriptions.limitation_of_liability")}
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mt-6 mb-3">
          {t("terms_conditions.terms.titles.changes_to_terms")}
        </h2>
        <p className="text-gray-700 mb-3">
          {t("terms_conditions.terms.descriptions.changes_to_terms")}
        </p>

        <p className="text-gray-700 mt-6">
          {t("terms_conditions.question")}{" "}
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
