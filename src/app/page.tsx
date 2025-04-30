import Hero from "@/components/hero"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ChatInput from "@/components/chat-input"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar />
      <Hero />
      <Footer />
      <ChatInput />
    </main>
  )
}
