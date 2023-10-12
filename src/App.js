import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    fetch("https://randomuser.me/")
      .then((response) => response.json())
      .then((json) => console.log(json))

  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h2>Prueba tecnica</h2>
      </header>
      <table>

        <tbody>
          <tr >
            <th>Foto</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Pais</th>
            <th>Acciones</th>
          </tr>
          <tr>
            <td>imagen </td>
            <td>juan</td>
            <td>perez</td>
            <td>chile</td>
            <td>5</td>

          </tr>
        </tbody>

      </table>
    </div >
  );
}

export default App;
