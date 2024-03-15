const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map(part =>
        <p key={part.id}>{part.name} {part.exercises}</p>
      )}
      <p><strong>total of {course.parts.reduce((acu,{exercises})=>acu+exercises,0)} exercises</strong></p>
    </div>
  )
}

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map(course=><Course key={course.id} course={course}/>)}
    </div>
  )
}

export default Courses
