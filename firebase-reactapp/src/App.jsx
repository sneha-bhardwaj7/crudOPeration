import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firebase";

const db = getDatabase(app);

function App() {
  const putData = () => {
    set(ref(db, "users/piyush"), {
      id: 1,
      name: "Piyush",
      age: 21,
    });
  };

  return (
    <div className="App">
      <h1>Firebase React App</h1>
      <button onClick={putData}>Put data</button>
    </div>
  );
}

export default App;