
import Navbar from "src/shared/layout/Navbar";
import { MainRegister } from "src/components/sections/MainRegister";
import { Footer } from "src/shared/layout/Footer";

export default function Home() {
  return (
      <main>
        <div> 
          <Navbar />

          <MainRegister />

          <Footer />
        </div>
      </main>
  )
}
