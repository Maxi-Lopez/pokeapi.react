import { useState } from "react"
import { Link } from "react-router-dom"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Dialog } from "primereact/dialog"

const PokeListados = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pokemons, setPokemons] = useState([])
  const [abilities, setAbilities] = useState([])
  const [seleccionado, setSeleccionado] = useState(null)

  const cargarDatos = async () => {
    setLoading(true)
    setError(null)
    try {
      const [resPok, resAb] = await Promise.all([
        fetch("https://pokeapi.co/api/v2/pokemon?limit=50"),
        fetch("https://pokeapi.co/api/v2/ability?limit=50")
      ])
      if (!resPok.ok || !resAb.ok) throw new Error("Error al cargar datos")
      const dataPok = await resPok.json()
      const dataHab = await resAb.json()
      setPokemons(dataPok.results)
      setAbilities(dataHab.results)
    } 
    catch (err) {
      setError(err.message)
      setPokemons([])
      setAbilities([])
    } 
    finally {
      setLoading(false)
    }
  }

  if (pokemons.length === 0 && !loading) cargarDatos()

  const mostrarDetalle = async (url) => {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error("Error al obtener detalle")
      const data = await res.json()
      setSeleccionado(data)
    } 
    catch (err) {
      console.error(err)
      setSeleccionado(null)
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <Link 
        to="/" 
        style={{
          position: "absolute",
          left: "20px",
          top: "20px",
          textDecoration: "none",
          color: "#007bff"
        }}
      >
        ← Volver a Home
      </Link>

      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Pokemons</h1>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {pokemons.length > 0 && abilities.length > 0 && (
        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <h3>Pokemon</h3>
            <DataTable value={pokemons} paginator rows={50}>
              <Column 
                header="#" 
                body={(rowData, options) => options.rowIndex + 1} 
                style={{ width: "50px" }} 
              />
              <Column 
                field="name" 
                header="Nombre" 
                body={(rowData) => (
                  <span 
                    style={{ cursor: "pointer", textTransform: "capitalize" }}
                    onClick={() => mostrarDetalle(rowData.url)}
                  >
                    {rowData.name}
                  </span>
                )}
              />
            </DataTable>
          </div>

          <div style={{ flex: 1 }}>
            <h3>Habilidades</h3>
            <DataTable value={abilities} paginator rows={50}>
              <Column 
                header="#" 
                body={(rowData, options) => options.rowIndex + 1} 
                style={{ width: "50px" }} 
              />
              <Column field="name" header="Tipo" body={(rowData) => rowData.name} />
            </DataTable>
          </div>
        </div>
      )}

      <Dialog 
        header={seleccionado?.name?.toUpperCase()} 
        visible={!!seleccionado} 
        style={{ width: "350px" }} 
        modal 
        onHide={() => setSeleccionado(null)}
      >
        {seleccionado && (
          <div style={{ textAlign: "center" }}>
            {seleccionado.sprites?.front_default && (
              <img
                src={seleccionado.sprites.front_default}
                alt={seleccionado.name}
                style={{ width: "120px" }}
              />
            )}
            <p><strong>ID:</strong> {seleccionado.id}</p>
            <p><strong>Peso:</strong> {seleccionado.weight}</p>
            <p><strong>Altura:</strong> {seleccionado.height}</p>
            <p><strong>Tipo:</strong> {seleccionado.types?.map(t => t.type.name).join(", ")}</p>
          </div>
        )}
      </Dialog>
    </div>
  )
}

export default PokeListados
