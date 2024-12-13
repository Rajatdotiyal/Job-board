import Navbar from "../components/Navbar";
import useSignupandSignin from "../hooks/useSignupSigninButton";

export default function AboutUs(){
  const { isButton, setIsButton } = useSignupandSignin();

    return<>
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Navbar isButton={isButton} setIsButton={setIsButton} />
      {/* Hero Section */}
      <section className="bg-indigo-700 text-white py-20 text-center">
        <h2 className="text-4xl font-extrabold mb-4">About Us</h2>
        <p className="text-lg max-w-2xl mx-auto">
          JobBoard connects talent with opportunity. We are dedicated to building a seamless platform for job seekers and employers to come together.
        </p>
      </section>

     

      {/* About Us Section */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-gray-800">Our Mission</h3>
            <p className="text-lg text-gray-700">
              At JobBoard, we aim to simplify the job search and recruitment process. We believe everyone should have access to meaningful career opportunities, and companies deserve to find the best talent to drive their success.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-gray-800">Our Vision</h3>
            <p className="text-lg text-gray-700">
              Our vision is to be the most trusted platform for career growth. We aim to empower both job seekers and employers by creating a transparent, efficient, and dynamic job market.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <section className="my-12">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">Our Core Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold text-indigo-600 mb-2">Integrity</h4>
              <p className="text-gray-700">
                We value honesty and transparency in all our interactions, ensuring trust and credibility.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold text-indigo-600 mb-2">Innovation</h4>
              <p className="text-gray-700">
                We constantly evolve our platform to meet the needs of job seekers and employers.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold text-indigo-600 mb-2">Collaboration</h4>
              <p className="text-gray-700">
                We believe in teamwork to solve challenges and help individuals and businesses grow together.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold text-indigo-600 mb-2">Customer Focus</h4>
              <p className="text-gray-700">
                We prioritize the needs of our users, providing exceptional service to both job seekers and employers.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold text-indigo-600 mb-2">Excellence</h4>
              <p className="text-gray-700">
                We strive to provide the highest quality service and platform experience for our users.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold text-indigo-600 mb-2">Sustainability</h4>
              <p className="text-gray-700">
                We are committed to maintaining long-term relationships with both job seekers and employers by continuously improving our services.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 JobBoard. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </>
}