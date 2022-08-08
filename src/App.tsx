import { CheckCircle, Circle, PlusCircle, Trash } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid';

import styles from './App.module.css'
import logoTodo from './assets/logo.svg'
import imgClipboard from './assets/clipboard.png'
import { ChangeEvent, FormEvent, useState } from 'react'

interface Tasks {
  id: string,
  task: string,
  isDone: boolean,
}

function App() {
  const [inputTask,setInputTask] = useState('')
  const [tasks, setTasks] = useState<Tasks[]>([])

  const countTasks = tasks.length
  const countTasksIsDone = tasks.reduce((done, tasks) => {
    if (tasks.isDone) {
      return done + 1
    }
    return done
  }, 0)
  
  function handleChangeValueInputTask(event: ChangeEvent<HTMLInputElement>) {
    setInputTask(event.target.value)
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const newTasks: Tasks = {
      id: uuidv4(),
      task: inputTask,
      isDone: false
    }

    setTasks([...tasks, newTasks])
    setInputTask('')
  }

  function handleDeleteTask(id: string) {
    const taskWithoutDeletedOne = tasks.filter((tasks) => tasks.id !== id)

    setTasks(taskWithoutDeletedOne)
  }

  function handleToggleCompleteTask(id: string) {
    const taskCompleted = tasks.map((tasks) => {
      if (tasks.id === id) {
        tasks.isDone = !tasks.isDone
      }
      return tasks
    })

    setTasks(taskCompleted)
  }

  return (
    <>
      <header className={styles.header}>
        <img src={logoTodo} alt="Rocketseat Todo" />
      </header>
      <main className={styles.container}>
        <form onSubmit={handleCreateNewTask} className={styles.addTodo}>
          <input value={inputTask} onChange={handleChangeValueInputTask} type="text" placeholder='Adicione uma nova tarefa' />
          <button disabled={inputTask.length === 0} type="submit">Criar <PlusCircle size={16} weight="bold" /></button>
        </form>
        <div className={styles.tasksHeader}>
          <p className={styles.tasksCriadas}>Tarefas Criadas <span>{countTasks}</span></p>
          <p className={styles.tasksConcluidas}>Concluídas <span>{countTasks ? `${countTasksIsDone} de ${countTasks}` : countTasksIsDone}</span></p>
        </div>
        {countTasks === 0 ? (
          <div className={styles.tasksEmpty}>
            <img src={imgClipboard} alt="Clipboard" />
            <p>Você ainda não tem tarefas cadastradas</p>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        ) : (
            <>
              {tasks.map((task) => {
                return (
                  <div key={task.id} className={styles.tasks}>
                    {task.isDone ? (
                      <CheckCircle onClick={() => handleToggleCompleteTask(task.id)} className={styles.checked} size={24} weight="fill" />
                    ) : (
                      <Circle onClick={() => handleToggleCompleteTask(task.id)} className={styles.unchecked} weight="duotone"  size={24} />
                    )}
                    <p className={task.isDone ? styles.complete : ""}>{task.task}</p>
                    <Trash onClick={() => handleDeleteTask(task.id)} className={styles.trash} size={28} />
                  </div>
                )
              })}
            </>
        )}
      </main>
    </>
  )
}

export default App
