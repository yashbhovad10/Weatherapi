import React, { useState } from "react";

const StudentCard = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 21,
      course: "Computer Science",
      grade: "A",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 22,
      course: "Electrical Engineering",
      grade: "B",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Alice Johnson",
      age: 23,
      course: "Mechanical Engineering",
      grade: "A+",
      image: "https://via.placeholder.com/150",
    },
  ]);

  const handleViewDetails = (student) => {
    alert(`Viewing details for ${student.name}`);
  };

  return (
    <div className="container d-flex flex-wrap justify-content-evenly">
      {students.map((student) => (
        <div key={student.id} className="card mt-3" style={{ width: "18rem" }}>
          <img src={student.image} className="card-img-top" alt={student.name} />
          <div className="card-body">
            <h5 className="card-title">{student.name}</h5>
            <p className="card-text"><strong>Age:</strong> {student.age}</p>
            <p className="card-text"><strong>Course:</strong> {student.course}</p>
            <p className="card-text"><strong>Grade:</strong> {student.grade}</p>
            <button className="btn btn-primary" onClick={() => handleViewDetails(student)}>
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentCard;
