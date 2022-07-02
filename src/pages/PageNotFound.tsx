import { Link } from "react-router-dom";

export function PageNotFound() {
  return (
    <div className="bg-blur bg-cover bg-no-repeat min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-4xl text-gray-200 font-bold">Página não encontrada!</h1>
      <span className="text-2xl text-gray-200">Se sentindo perdido? Clique
        <Link className="text-green-500 mx-2" to='/event'>aqui</Link>
        para votlar a página principal!
      </span>
    </div>
  )
}