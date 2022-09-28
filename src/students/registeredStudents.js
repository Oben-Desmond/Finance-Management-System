document.addEventListener("DOMContentLoaded", async () => {
  console.log("Renderer > DOMContentLoaded");

  // ############# GET ALL STUDENTS CODE ###################################################################
  let students = await window.api.getStudents();
  let tableData = document.getElementById("students");

  let studentString = students
    .map((stud) => {
      return `<tr id="${stud.id}">
        <td>${stud.id}</td>
        <td>${stud.student_number}</td>
        <td>${stud.registration_number}</td>
        <td>${stud.student_name}</td>
        <td>${stud.student_level}</td>
        <td>${stud.student_section}</td>
        <td>${stud.amount}</td>
        <td>${stud.balance}</td>
        <td>${stud.Timestamp}</td>
        <td>
          <button onclick="editStudent(${stud.id})" id="editBtn">Edit</button>
          <button onclick="deleteStudent(${stud.id})" id="deleteBtn">Delete</button>
        </td>
        </tr>`;
    })
    .join("<br/>");

  tableData.innerHTML = studentString;

  // ############# MODAL FUNCTION ###################################################################
  const modalFunction = () => {
    var modal = document.getElementById("editModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function () {
      modal.style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  };

  const deleteModalFunction = () => {
    var modal = document.getElementById("deleteModal");
    var span = document.getElementsByClassName("closeDelete")[0];
    modal.style.display = "block";
    span.onclick = function () {
      modal.style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  };

  // ############# EDIT FUNCTION ###################################################################
  editStudent = async (id) => {
    await window.api.findStudentById(id);
    let oneStudent = await window.api.getStudentById();

    oneStudent.map((data) => {
      document.getElementById("studentNumber").value = data.student_number;
      document.getElementById("registrationNumber").value =
        data.registration_number;
      document.getElementById("studentName").value = data.student_name;
      document.getElementById("studentLevel").value = data.student_level;
      document.getElementById("section").value = data.student_section;
      document.getElementById("amount").value = data.amount;
      document.getElementById("balance").value = data.balance;
    });
    modalFunction();

    const form = document.querySelector("#updateForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const student = {
        id,
        student_number: document.querySelector("#studentNumber").value,
        registration_number: document.querySelector("#registrationNumber")
          .value,
        student_name: document.querySelector("#studentName").value,
        student_level: document.querySelector("#studentLevel").value,
        section: document.querySelector("#section").value,
        amount: document.querySelector("#amount").value,
        balance: document.querySelector("#balance").value,
      };

      // UPDATING A STUDENT
      let newStudent = window.api.updateStudent(
        id,
        (student_number = student.student_number),
        (registration_number = student.registration_number),
        (student_name = student.student_name),
        (student_level = student.student_level),
        (student_section = student.section),
        (amount = student.amount),
        (balance = student.balance)
      );

      oneStudent.map((data) => {
        document.getElementById("studentNumber").value = "";
        document.getElementById("registrationNumber").value = "";
        document.getElementById("studentName").value = "";
        document.getElementById("studentLevel").value = "";
        document.getElementById("section").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("balance").value = "";
      });
    });
  };

  // ############# DELETE FUNCTION ###################################################################
  deleteHandler = async function (id) {
    await window.api.deleteStudent(id);
  };

  deleteStudent = function (id) {
    deleteModalFunction();
    let question = document.getElementById("question");
    let deleteBtn = `<div>
    <p>Are you sure you want to delete this student?</p>
    <button onclick="deleteHandler(${id})" class="deleteBtn">DELETE</button>
    </div>`;
    question.innerHTML = deleteBtn;
  };
});
