document.addEventListener("DOMContentLoaded", async () => {
  console.log("Renderer > DOMContentLoaded");

  // LISTING DEPARTMENTS
  let departments = await window.api.getDepartments();
  let tableData = document.getElementById("departments");
  let departmentString = departments
    .map((dept) => {
      return `<option id="${dept.Did}" value="${dept.dept_name}">${dept.dept_name}</option>`;
    })
    .join("<br/>");

  tableData.innerHTML = departmentString;

  // LISTING LEVELS
  let levels = await window.api.getLevels();
  let levelData = document.getElementById("studentLevel");
  let levelString = levels
    .map((data) => {
      return `<option id="${data.Lid}" value="${data.level_name}">${data.level_name}</option>`;
    })
    .join("<br/>");

  levelData.innerHTML = levelString;

  const form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const student = {
      student_number: document.querySelector("#studentNumber").value,
      registration_number: document.querySelector("#registrationNumber").value,
      student_name: document.querySelector("#studentName").value,
      student_level: document.querySelector("#studentLevel").value,
      section: document.querySelector("#departments").value,
      amount: document.querySelector("#amount").value,
    };

    // ADDING A STUDENT
    let newStudent = window.api.addStudent(
      (student_number = student.student_number),
      (registration_number = student.registration_number),
      (student_name = student.student_name),
      (student_level = student.student_level),
      (student_section = student.section),
      (amount = student.amount)
    );
  });
});
