import HomeCard from "@/components/homeCard";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      {/* Espaço que ajusta o layout para o footer ficar embaixo */}
      <div className="flex-grow" >
        <div className="flex items-center justify-center" style={{ height: "calc(100vh - 15rem)" }}>
          <HomeCard />
        </div>
      </div>
    </div>
  );
}
