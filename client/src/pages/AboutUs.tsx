import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function AboutUs() {
  const team = [
    {
      name: "Khalid Qureshi",
      linkedin: "https://www.linkedin.com/in/khalid-qureshi-4a2b8b282/",
      github: "https://github.com/khalidqureshi",
      email: "khalidqureshi1198@gmail.com",
    },
    {
      name: "Pankaj Parihar",
      linkedin: "https://www.linkedin.com/in/pankaj9769/",
      github: "https://github.com/pankaj9769",
      email: "pnkj.parihar123@gmail.com",
    },
    {
      name: "Shawn D'Costa",
      linkedin: "https://www.linkedin.com/in/shawn-d-costa-432034249/",
      github: "https://github.com/shawn-dcosta",
      email: "dcostashawn@gmail.com",
    },
    {
      name: "Aishani Chauhan",
      linkedin: "https://www.linkedin.com/in/aishani-chauhan-325453326/",
      github: "https://github.com/aishanichauhan",
      email: "aishanichauhan23@gmail.com",
    },
    {
      name: "Leena Vasyani",
      linkedin: "https://www.linkedin.com/in/leena-vasyani/",
      github: "https://github.com/leenavasyani",
      email: "vasyanileena28@gmail.com",
    },
    {
      name: "Soham Amare",
      linkedin: "https://www.linkedin.com/in/soham-amare-6abb31250/",
      github: "https://github.com/sohamamare",
      email: "amaresoham@gmail.com",
    },
  ];

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
        <ul className="space-y-4">
          {team.map((member, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-50 rounded-lg p-3 shadow-sm hover:shadow-md transition"
            >
              <span className="font-medium text-gray-800">{member.name}</span>
              <div className="flex space-x-4 text-xl">
                <a
                  href={`mailto:${member.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:opacity-80"
                  title={member.email}
                >
                  <SiGmail />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:opacity-80"
                  title="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:opacity-80"
                  title="GitHub"
                >
                  <FaGithub />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
