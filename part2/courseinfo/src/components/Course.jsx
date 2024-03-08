const Header = ({ course }) => {
  console.log(course);
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((element) => {
        return <Part key={element.id} parts={element} />;
      })}
    </div>
  );
};

const Part = ({ parts }) => {
  console.log(parts);
  return (
    <p>
      {parts.name} {parts.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, element) => sum + element.exercises, 0);
  console.log(total);
  return <strong>total of {total} exercises</strong>;
};

const Course = ({ course }) => {
  console.log(course);
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
