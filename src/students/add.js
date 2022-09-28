document.addEventListener("DOMContentLoaded", async () => {
  console.log("Renderer > DOMContentLoaded");
  console.log(window);
  const form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const student = {
      student_number: document.querySelector("#studentNumber").value,
      registration_number: document.querySelector("#registrationNumber").value,
      student_name: document.querySelector("#studentName").value,
      student_level: document.querySelector("#studentLevel").value,
      section: document.querySelector("#section").value,
      amount: document.querySelector("#amount").value,
      balance: document.querySelector("#balance").value,
    };

    // ADDING A STUDENT
    let newStudent = window.api.addStudent(
      (student_number = student.student_number),
      (registration_number = student.registration_number),
      (student_name = student.student_name),
      (student_level = student.student_level),
      (student_section = student.section),
      (amount = student.amount),
      (balance = student.balance)
    );
  });
});
