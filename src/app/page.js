import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import DestinationsList from "@/components/DestinationsList";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Banner />
      <DestinationsList />
      <Footer />
    </div>
  );
}
