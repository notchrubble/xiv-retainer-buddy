import AddRetainerButton from "./add_retainer_button";
import RetainerCard from "./retainer_card";

export interface Retainer {
  name: string;
  job: string;
  level: number;
  itemLevel: number;
  gathering: number;
  perception: number;
}

const retainers: Retainer[] = [
  {
    name: "Alice",
    job: "Miner",
    level: 80,
    itemLevel: 500,
    gathering: 300,
    perception: 250,
  },
  {
    name: "Bob",
    job: "Botanist",
    level: 75,
    itemLevel: 480,
    gathering: 280,
    perception: 240,
  },
];

export default function RetainerContainer() {
  return (
    <div className="col-span-12 mb-4 min-h-screen rounded-2xl font-sans outline lg:col-span-4 lg:mb-0">
      <div className="flex items-start justify-between gap-2 p-6">
        <h1 className="font-bold text-gray-50">Retainers</h1>
        <AddRetainerButton />
      </div>
      <div className="p-6">
        {retainers.map((retainer, index) => (
          <div key={index} className="mb-4">
            <RetainerCard retainer={retainer} />
          </div>
        ))}
      </div>
    </div>
  );
}
