export default function AboutUs() {
  return (
    <div className="min-h-screen py-12 px-6 md:px-20">
      <div className="max-w-5xl mx-auto bg-white shadow-lg bg-white/60 backdrop-blur-md rounded-none sm:rounded-2xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
          About Us
        </h1>
        <p className="leading-relaxed mb-4">
          Welcome to{" "}
          <span className="font-semibold">
            <span className="text-[#69320a]">Bhoomi</span>
            <span className="text-green-700">बंधु</span>
          </span>
          , a platform dedicated to empowering farmers with technology-driven
          solutions. Our mission is to simplify farming decisions by providing
          insights on weather, crop health, schemes, and real-time advisories
          tailored to their location.
        </p>
        <p className="leading-relaxed mb-4">
          We are a passionate team of developers, researchers, and innovators
          working together to make agriculture smarter, sustainable, and more
          efficient.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mt-8 mb-4">
          Meet the Team
        </h2>
        <ul className="space-y-2">
          <li>
            📧 Khalid Qureshi -{" "}
            <a
              href="mailto:khalidqureshi1198@gmail.com"
              className="text-green-600 hover:underline"
            >
              khalidqureshi1198@gmail.com
            </a>
          </li>
          <li>
            📧 Pankaj Parihar -{" "}
            <a
              href="mailto:pnkj.parihar123@gmail.com"
              className="text-green-600 hover:underline"
            >
              pnkj.parihar123@gmail.com
            </a>
          </li>
          <li>
            📧 Shawn D'Costa -{" "}
            <a
              href="mailto:dcostashawn@gmail.com"
              className="text-green-600 hover:underline"
            >
              dcostashawn@gmail.com
            </a>
          </li>
          <li>
            📧 Aishani Chauhan -{" "}
            <a
              href="mailto:aishanichauhan23@gmail.com"
              className="text-green-600 hover:underline"
            >
              aishanichauhan23@gmail.com
            </a>
          </li>
          <li>
            📧 Leena Vasyani -{" "}
            <a
              href="mailto:vasyanileena28@gmail.com"
              className="text-green-600 hover:underline"
            >
              vasyanileena28@gmail.com
            </a>
          </li>
          <li>
            📧 Soham Amare -{" "}
            <a
              href="mailto:amaresoham@gmail.com"
              className="text-green-600 hover:underline"
            >
              amaresoham@gmail.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
