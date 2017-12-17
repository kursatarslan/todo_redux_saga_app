import React from 'react';
import Header from '../components/header';
import TasksPage from '../pages/tasks';

const App = () => (
  <div>
    <Header/>
    <main>
      <TasksPage exact path="/" component={TasksPage}/>
    </main>
  </div>
);

export default App;