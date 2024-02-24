const Header = (props) => {
    return <h1>{props.name}</h1>
  }
  
  const Total = (props) => {
    return <h3>Number of {props.sumOfExercises} exercises </h3>
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercise}
      </p>
    )
  }
  
  const Content = (props) => {
      const parts = props.parts;
      const sum = parts.reduce(((total, part) => { return total + part.exercises}), 0);
      return (
        <div>
          {parts.map((part) => {
          return <Part name={part.name} exercise= {part.exercises}/>
        }) }
        <Total sumOfExercises = {sum}/>
        </div>
      )
  
  }
  const Course = (props) => {
    return(
      <div>
        {props.courses.map(course => {
          const name = course.name;
          const parts = course.parts;
        return(
          <div>
            <Header name={name}/>
            <Content parts={parts}/>
          </div>
        )
        })}
      </div>
    )
  }

  export default Course;