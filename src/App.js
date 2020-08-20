import React, { useState, useEffect } from "react";

import RepositoryItem from './components/RepositoryItem'

import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    getRepositories()
  }, []);

  async function getRepositories() {
    const response = await api.get('repositories');
    setRepositories(response.data)
  }

  async function handleAddRepository() {
    const repository = {
      "title": `New Repo (${Date.now()})`,
      "url": "https://github.com/JBezerra/gostack-desafio-conceitos-nodejs",
      "techs": ["NewTechs"]
    }
    const response = await api.post('repositories', repository);
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    let repositoryIndex = repositories.findIndex(repository => repository.id === id);
    if (response.status === 204 && repositoryIndex >= 0) {
      let newRepositories = [...repositories];
      newRepositories.splice(repositoryIndex, 1);
      setRepositories(newRepositories);
    }
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <RepositoryItem
            key={repository.id}
            id={repository.id}
            title={repository.title}
            handleRemoveRepository={handleRemoveRepository}
          />
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
