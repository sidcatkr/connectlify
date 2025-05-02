import Hero from "@/components/hero"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ChatInput from "@/components/chat-input"
import ParallaxSection from "@/components/parallax-section"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar />
      <Hero />
      <div className="w-full h-[500vh]">
        <ParallaxSection />
      </div>
      <Footer />
      <ChatInput />
    </main>
  )
}
