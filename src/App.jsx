import Table from "./components/table/Table";
import animalGroups from "./data/animal-groups";


function App() {

  return <>
    <Table title="Animal groups" data={ animalGroups } />
  </>
}

export default App;
