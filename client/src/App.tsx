import Kanban from './components/Kanban/Kanban';

const App = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center pt-4 pb-2">
        Support TaskFlow Board
      </h1>
      <p className="text-center text-sm text-muted-foreground py-1">
        This is a simple kanban board for managing support tickets from Postmark
        inbox.
      </p>
      <p className="text-center text-sm text-muted-foreground py-1">
        <a
          href="https://github.com/iefendiev/postmark-kanban-inbox"
          className="text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
      <Kanban />
    </div>
  );
};

export default App;
