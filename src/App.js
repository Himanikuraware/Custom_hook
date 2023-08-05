import React, { useEffect, useState } from "react";

import { useHttp } from "./hooks/use-http";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import ForwardCounter from "./components/ForwardCounter";
import BackwardCounter from "./components/BackwardCounter";

function App() {
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const getTasks = (taskList) => {
      const loadedTasks = [];
      for (const taskKey in taskList) {
        loadedTasks.push({ id: taskKey, text: taskList[taskKey].text });
      }
      setTasks(loadedTasks);
    }; 
    fetchTasks(
      {
        url: "https://react-http-6b4a6.firebaseio.com/tasks.json",
      },
      getTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
      <ForwardCounter />
      <BackwardCounter />
    </React.Fragment>
  );
}

export default App;
