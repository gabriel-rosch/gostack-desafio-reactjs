import React, {useEffect, useState} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  useEffect(()=>{
      api.get('/repositories').then(response =>{
          setRepositories(response.data)
      })
  },[]);

  async function handleAddRepository() {
      const response = await api.post('/repositories',{
          title: "Title",
          techs: "node.js",
          url: "www.com.br",
          likes: 1
      })
      const repositorie = response.data;

      setRepositories([...repositories,repositorie]);
  }

  async function handleRemoveRepository(id) {
      await api.delete(`/repositories/${id}`)
      repositories.splice(repositories.find(x => x.id === id), 1);
      setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(x =>
              <li key={x.id}>{x.title}
                  <button onClick={() => handleRemoveRepository(x.id)}>
                      Remover
                  </button>
              </li>
          )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
