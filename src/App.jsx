import Tasklist from "./components/TaskList";
import TaksForm from "./components/TaskForm";

function App() {
  return (
    <main className="bg-zinc-50 min-h-screen">
      <div className="container mx-auto p-10 flex min-h flex-col md:flex-row gap-10">
        <TaksForm />
        <Tasklist />
      </div>
    </main>
  );
}

export default App;
