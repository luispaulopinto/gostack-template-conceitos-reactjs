import React, { useState, useEffect } from "react";

import axios from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    axios.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      title: `New repository ${Date.now()}`,
      url: "fake url",
      techs: [],
      likes: 0,
    };

    axios.post("repositories", newRepository).then((response) => {
      setRepositories([...repositories, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    axios.delete(`repositories/${id}`).then(() => {
      const filteredRepositories = repositories.filter(
        (repository) => repository.id !== id
      );

      setRepositories([...filteredRepositories]);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
