import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import NoticeCard from "../components/NoticeCard";
import EventCard from "../components/EventCard";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>

        {/* Hero Section */}
        <section className="bg-green-100 text-center py-20 px-5">
          <h1 className="text-4xl font-bold text-green-800">
            Welcome to GramSetu
          </h1>

          <p className="mt-4 text-gray-700 text-lg">
            Your Digital Gram Panchayat Service Portal
          </p>

          <button className="mt-6 bg-green-700 text-white px-6 py-3 rounded-lg">
            Explore Services
          </button>
        </section>


        {/* Services Section */}
        <section className="max-w-6xl mx-auto py-12 px-5">
          <h2 className="text-3xl font-bold text-center mb-8">
            Village Services
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <ServiceCard
              title="💧 Water Supply"
              description="Get information about village water supply services."
            />

            <ServiceCard
              title="💡 Street Lights"
              description="Report and track street light related issues."
            />

            <ServiceCard
              title="🛣️ Road Maintenance"
              description="Access information about road maintenance services."
            />

          </div>
        </section>


        {/* Notices Section */}
        <section className="bg-gray-100 py-12 px-5">
          <h2 className="text-3xl font-bold text-center mb-8">
            Latest Notices
          </h2>

          <div className="max-w-4xl mx-auto grid gap-5">

            <NoticeCard
              title="Gram Sabha Meeting"
              description="A Gram Sabha meeting will be conducted this Sunday."
              date="20 August 2026"
            />

            <NoticeCard
              title="Water Supply Maintenance"
              description="Water supply may be temporarily unavailable due to maintenance."
              date="22 August 2026"
            />

          </div>
        </section>


        {/* Events Section */}
        <section className="max-w-6xl mx-auto py-12 px-5">
          <h2 className="text-3xl font-bold text-center mb-8">
            Upcoming Events
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <EventCard
              title="Village Health Camp"
              date="25 August 2026"
              location="Gram Panchayat Hall"
            />

            <EventCard
              title="Clean Village Campaign"
              date="30 August 2026"
              location="Main Village Area"
            />

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}