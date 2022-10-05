const Controller = require("../models/controller");
const Department = require("../models/departmentController");
const Expenditure = require("../models/expenditureController");
const Dashboard = require("../models/dashboardController");
const Levels = require("../models/levelController");
const Fees = require("../models/feeController");
const OtherIncome = require("../models/otherIncomeController");
const Expense = require("../models/expenseController");

const departmetCtl = new Department();
const studentCtl = new Controller();
const expenditureCtl = new Expenditure();
const dashboardCtl = new Dashboard();
const levelCtl = new Levels();
const feeCtl = new Fees();
const otherIncomeCtl = new OtherIncome();
const expenseCtrl = new Expense();

const { contextBridge, ipcRenderer } = require("electron");

// GET TOTAL INCOME
module.exports = totalIncome = () => {
  const income = dashboardCtl.totalIncome();

  return income;
};
const tlIncome = totalIncome();

// GET TOTAL FEE INCOME
module.exports = totalFeeIncome = () => {
  const income = dashboardCtl.totalFeeIncome();

  return income;
};
const tlFeeIncome = totalFeeIncome();

// OTHER INCOME TOTAL
module.exports = otherIncomeTotal = () => {
  const income = dashboardCtl.otherIncomeTotal();

  return income;
};
const otherIncome = otherIncomeTotal();

// ####################### STUDENT FUNCTIONS ###################################################

// GET ALL STUDENTS
module.exports = getStudents = () => {
  const allStudents = studentCtl.getStudents();

  return allStudents;
};
const students = getStudents();

// GET ALL STUDENT BY ID
let returnedStudent;
module.exports = getStudentById = async (id) => {
  const student = await studentCtl.getStudentById(id);
  returnedStudent = student;

  return student;
};

// ADD A STUDENT
module.exports = addStudent = (
  studentNumber,
  registrationNumber,
  studentName,
  studentLevel,
  section,
  amount
) => {
  const addStud = studentCtl.addStudent(
    studentNumber,
    registrationNumber,
    studentName,
    studentLevel,
    section,
    amount
  );

  return addStud;
};

// UPDATE A STUDENT
module.exports = updateStudent = (
  id,
  studentNumber,
  registrationNumber,
  studentName,
  studentLevel,
  section
) => {
  const updateStud = studentCtl.updateStudent(
    id,
    studentNumber,
    registrationNumber,
    studentName,
    studentLevel,
    section
  );

  return updateStud;
};

// DELETE STUDENT
module.exports = deleteStudent = (id) => {
  const deletedStudent = studentCtl.deleteStudent(id);

  return deletedStudent;
};

// ####################### DEPARTMENT FUNCTIONS ###################################################

// GET ALL DEPARTMENTS
module.exports = allDepartments = () => {
  const departments = departmetCtl.allDepartments();

  return departments;
};
const departments = allDepartments();

// GET DEPT BY ID
let returnedDepartment;
module.exports = getDepartmentById = (id) => {
  const department = departmetCtl.getDepartmentById(id);
  returnedDepartment = department;

  return department;
};

// ADD A DEPARTMENT
module.exports = addDepartment = (
  departmentName,
  departmentDescription,
  fee_amount
) => {
  const addDept = departmetCtl.addDepartment(
    departmentName,
    departmentDescription,
    fee_amount
  );

  return addDept;
};

// UPDATE A DEPARTMENT
module.exports = updateDepartment = (
  id,
  departmentName,
  departmentDescription,
  fee_amount
) => {
  const updateDept = departmetCtl.updateDepartment(
    id,
    departmentName,
    departmentDescription,
    fee_amount
  );

  return updateDept;
};

// DELETE DEPARTMENT
module.exports = deleteDepartment = (id) => {
  const deletedDepartment = departmetCtl.deleteDepartment(id);

  return deletedDepartment;
};

// ####################### EXPENDITURE FUNCTIONS ###################################################

module.exports = totalExpenses = () => {
  const expenses = studentCtl.totalExpenses();

  return expenses;
};

module.exports = totalIncomeExpenses = () => {
  const expenses = expenseCtrl.totalIncomeExpenses();

  return expenses;
};

module.exports = addIncomeExpense = (income) => {
  expenseCtrl.addIncomeExpense(income);
};

module.exports = addBudgetHeadIncome = (budget) => {
  expenseCtrl.addBudgetHeadIncome(budget);
};

module.exports = getBudgetData = () => {
  const bh = expenseCtrl.getBudgetData();

  return bh;
};

module.exports = getBudgetHeadById = (id) => {
  return expenseCtrl.getBudgetHeadById(id);
};

module.exports = updateBudgetHead = (
  id,
  name,
  description,
  amount,
  balance
) => {
  return expenseCtrl.updateBudgetHead(id, name, description, amount, balance);
};

module.exports = deleteBudgetHead = (id) => {
  return expenseCtrl.deleteBudgetHead(id);
};

// ############################ LEVEL FUNCTIONS ###########################################################

// ADD LEVEL
module.exports = addLevel = (level_name) => {
  const addLevel = levelCtl.addLevel(level_name);

  return addLevel;
};

// GET ALL LEVELS
module.exports = allLevels = () => {
  const levels = levelCtl.allLevels();

  return levels;
};
const levels = allLevels();

// ############################ FEE TRANSACTIONS FUNCTIONS ###########################################################

// ADD FEE
module.exports = payFee = (
  id,
  student_number,
  reg_number,
  department,
  student_name,
  amount
) => {
  const payFee = feeCtl.payFee(
    id,
    student_number,
    reg_number,
    department,
    student_name,
    amount
  );

  return payFee;
};

// GET ALL TRANSACTIONS
module.exports = allFeeTransactions = () => {
  const transations = feeCtl.allFeeTransactions();

  return transations;
};
const feeTransations = allFeeTransactions();

// ############################ OTHER INCOME FUNCTIONS ###########################################################

// ADD INCOME
module.exports = addIncome = (source, sourcenName, amount) => {
  const addIncome = otherIncomeCtl.addIncome(source, sourcenName, amount);

  return addIncome;
};

// GET ALL INCOMES
module.exports = allIncomes = () => {
  const incomes = otherIncomeCtl.allIncomes();

  return incomes;
};
const other_incomes = allIncomes();

// ####################### CONTEXT BRIDGE ###################################################

contextBridge.exposeInMainWorld("api", {
  // total income ################
  totalIncome: function () {
    return tlIncome;
  },

  // total fee income ################
  totalFeeIncome: function () {
    return tlFeeIncome;
  },

  // total other income ################
  otherIncomeTotal: function () {
    return otherIncome;
  },

  // Students ##########################
  getStudents: function () {
    return students;
  },
  getStudentById: function () {
    return returnedStudent;
  },
  findStudentById: getStudentById,
  addStudent: addStudent,
  updateStudent: updateStudent,
  deleteStudent: deleteStudent,

  // Departments #######################
  getDepartments: function () {
    return departments;
  },
  getDepartmentById: function () {
    return returnedDepartment;
  },
  findDepartmentById: getDepartmentById,
  addDepartment: addDepartment,
  updateDepartment: updateDepartment,
  deleteDepartment: deleteDepartment,

  // LEVELS #########################
  getLevels: function () {
    return levels;
  },
  addLevel: addLevel,

  // FEE TRANSACTIONS #########################
  getFeeTransactions: function () {
    return feeTransations;
  },
  payFee: payFee,

  // OTHER INCOMES #########################
  getOtherIncomes: function () {
    return other_incomes;
  },
  addIncome: addIncome,

  // EXPENSES ##############################
  totalIncomeExpenses: totalIncomeExpenses,
  addIncomeExpense: addIncomeExpense,
  addBudgetHeadIncome: addBudgetHeadIncome,
  totalExpenses: totalExpenses,
  getBudgetData: getBudgetData,
  getBudgetHeadById: getBudgetHeadById,
  updateBudgetHead: updateBudgetHead,
  deleteBudgetHead: deleteBudgetHead,
});
