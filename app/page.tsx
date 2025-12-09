import RetainerContainer from "./components/retainer_container";
import ItemList from "./components/item_list";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-7xl flex-col items-center px-16 py-32 sm:items-start">
        <h1 className="text-2xl font-bold text-zinc-50 dark:text-white">
          FFXIV Retainer Buddy
        </h1>
        <p className="mt-4 text-zinc-400 dark:text-zinc-500">
          A tool to help you maximize your gil gains
        </p>
        <div className="mt-10 grid w-full grid-cols-12 gap-8">
          <RetainerContainer></RetainerContainer>
          <ItemList></ItemList>
        </div>
      </main>
    </div>
  );
}
