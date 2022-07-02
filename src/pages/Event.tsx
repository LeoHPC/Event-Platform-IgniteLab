import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Favicon from "../assets/favicon.svg";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";

export function Event() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()

  useEffect(() => {
    if (!localStorage.getItem('@EventPlatform: ID')) {
      navigate('/')
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        {
          slug
            ? <Video lessonSlug={slug} />
            : (
              <div className="bg-blur bg-cover flex flex-col bg-no-repeat flex-1 items-center justify-center max-w-[1100px]">
                <span className="flex items-center font-bold text-gray-200 text-2xl">
                  Bem-vindo(a) ao <span className="text-green-500 ml-2">Event Platform</span>!
                  <img className="h-6 ml-4" src={Favicon} alt="Logo do evento Ignite Lab" />
                </span>
                <span className="flex font-medium text-gray-200 text-xl">
                  Escolha um vídeo ao lado para começar sua jornada! 🚀
                </span>
              </div>
            )
        }
        <Sidebar />
      </main>
    </div>
  )
}