import Card from "@/components/card";

export default function Home() {
  const cardData = [
    { id: 1, title: "Basic Calculator" , link: "/basic-calculator"},
    { id: 2, title: "SDT Calculator", link: "/sdt-calculator" },
    { id: 3, title: "Age Calculator", link: "/age-calculator" },
    { id: 4, title: "Custom Calculator", link: "/custom-calculator" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1 className="text-2xl dark:text-white">Choose Your Calculator</h1>
      <div className="grid grid-cols-4 gap-4">
        {cardData.map((card) => (
          <Card key={card.id} title={card.title} link={card.link} />
        ))}
      </div>
    </main> 
  );
}
