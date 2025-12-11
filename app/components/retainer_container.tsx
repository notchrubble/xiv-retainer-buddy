import AddRetainerButton from "./add_retainer_button";

export default function RetainerContainer() {
  return (
    <div className="col-span-12 mb-4 min-h-screen rounded-2xl font-sans outline lg:col-span-4 lg:mb-0">
      <div className="flex items-start justify-between gap-2 p-6">
        <h1 className="font-bold text-gray-50">Retainers</h1>
        <AddRetainerButton />
      </div>
      <div className="p-6">
        <p className="text-md text-gray-50">
          Retainers will eventually go here
        </p>
      </div>
    </div>
  );
}
