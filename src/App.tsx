import Body from "./components/body/body";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";

export default function App() {
  return (
    <div className="flex flex-col lg:h-screen h-fit w-screen">
      <Header />
      <Body />
      <Footer />
    </div>
  )
}
