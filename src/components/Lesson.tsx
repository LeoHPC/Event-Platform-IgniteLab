import { format, isPast } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { CheckCircle, Lock } from 'phosphor-react'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames'

interface LessonProps {
  title: string
  slug: string
  availableAt: Date
  type: 'live' | 'class'
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>()

  const isLessonAvailable = isPast(props.availableAt)
  const availableDay = format(props.availableAt, "EEEE", {
    locale: ptBR,
  })
  const availableDateFormatted = format(props.availableAt, "' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR,
  })

  const availableDayFormatted = availableDay.split('-');

  const isActiveLesson = slug === props.slug;

  return (
    <Link to={`/event/lesson/${props.slug}`} className={`group ${!isLessonAvailable && 'pointer-events-none'}`}>
      <span className="text-gray-300 capitalize">
        {availableDayFormatted[0]}
      </span>
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>

      <div
        className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
          'bg-green-500': isActiveLesson
        })}
      >

        <header className="flex items-center justify-between">
          {
            isLessonAvailable ? (
              <span className={classNames('text-sm font-medium flex items-center gap-2', {
                'text-white': isActiveLesson,
                'text-blue-500': !isActiveLesson
              })}>
                <CheckCircle size={20} />
                Conteúdo liberado
              </span>
            ) : (
              <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                <Lock size={20} />
                Em breve
              </span>
            )
          }

          <span className={classNames('text-xs rounded px-2 py-[0.125rem] text-white border font-bold', {
            'border-white': isActiveLesson,
            'border-green-300': !isActiveLesson
          })}>
            {
              props.type === 'live'
                ? 'AO VIVO'
                : 'AULA PRÁTICA'
            }
          </span>
        </header>

        <strong className={classNames('mt-5 block', {
          'text-white': isActiveLesson,
          'text-gray-200': !isActiveLesson
        })}>
          {props.title}
        </strong>
      </div>
    </Link>
  )
}