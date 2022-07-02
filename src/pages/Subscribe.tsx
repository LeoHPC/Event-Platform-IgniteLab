import { gql, useMutation } from "@apollo/client";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CodeMockup from '../assets/code-mockup.png'
import { Logo } from "../components/Logo";
import { ReactLogo } from "../components/ReactLogo";

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber($name: String!, $email: String!) {
    createSubscriber(data: { name: $name, email: $email }) {
      id
    }
  }
`

export function Subscribe() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION);

  useEffect(() => {
    if (localStorage.getItem('@EventPlatform: ID')) {
      navigate('/event');
    }
  }, []);

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await createSubscriber({
        variables: {
          name,
          email
        }
      })

      localStorage.setItem('@EventPlatform: ID', response?.data?.createSubscriber.id);

      navigate('/event');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto relative z-20">
        <div className="absolute top-[-70px] left-60 pointer-events-none">
          <ReactLogo />
        </div>

        <div className="max-w-[640px]">
          <Logo />
          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma <strong className="text-blue-500">aplicação completa</strong>,
            do zero, <strong className="text-blue-500">com React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="text"
              placeholder="Seu nome completo"
              onChange={event => setName(event.target.value)}
            />
            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="email"
              placeholder="Digite seu e-mail"
              onChange={event => setEmail(event.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>

      <img src={CodeMockup} className="mt-8" alt="Imagem com um editor de códigos aberto" />
    </div>
  )
}