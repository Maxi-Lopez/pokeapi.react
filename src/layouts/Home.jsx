import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  const ir_PokeApi = () => {
    navigate("/pokeapi") 
  }

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Listado de Pokemons</h1>
      <button 
        onClick={ir_PokeApi} 
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: "pointer",
          marginTop: "1rem",
          color: "blue"
        }}
      >
        Ver Pokémon
      </button>
    </div>
  )
}
