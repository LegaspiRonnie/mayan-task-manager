import { useCallback, useState } from 'react'
import AlertMessage from './components/AlertMessage.jsx'
import InputTask from './components/TaskInput.jsx'
import TaskList from './components/TaskList.jsx'


function App() {
  const [notification, setNotification] = useState(null)
  const [createdTask, setCreatedTask] = useState(null)

  const notify = useCallback((type, message) => {
    setNotification({ type, message })
  }, [])

  const handleCreated = (task) => {
    setCreatedTask(task)
    notify('success', 'Task added successfully!')
  }

  return (
    <>
      <div className="container mt-3">
        <AlertMessage
          type={notification?.type}
          message={notification?.message}
          onClose={() => setNotification(null)}
        />
      </div>
      <header>
        <InputTask onCreated={handleCreated} onNotify={notify} />
      </header>

      <TaskList createdTask={createdTask} onNotify={notify} />
    </>
  )
}

export default App
