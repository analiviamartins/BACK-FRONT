import StudentsRepository  from "../models/students/StudentsRepository.js";
import Student from "../models/students/Student.js";

const studentsRepository = new StudentsRepository();

export const getStudents = async (req, res) => {
  try {
    const students = await studentsRepository.getStudents();
    if (!students) {
      return res.status(404).send({ message: "Não há estudantes cadastrados" });
    }
    return res.status(200).send({ totalUsers: students.length, students });

  } catch (error) {
    return res.status(500).send({message: "erro a\o buscar os estudantes", error: error.message})
  }
};

export const getStudentById = async (req, res) => {

  try {
    const { id } = req.params;

    const student = await studentsRepository.getStudentById(id);

    if (!student) {res.status(404).send({ message: "Estudante não encontrado!" })};
  } catch (error) {
   return res.status(500).send({message: "Erro ao buscar estudante por id", error: error.message,});
  }
};

export const createStudent = async (req, res) => {
  try { 
    const { name, age, email, code, grade } = req.body;

  const studentAlreadyExists = await studentsRepository.getStudentByCode(code);

  if (studentAlreadyExists) {
    return res.status(409).send({ message: "Estudante já cadastrado" });
  }

  const student = new Student(name, age, email, code, grade);

  await studentsRepository.addStudent(student);

  return res.status(201).send({ message: "Estudante criado com sucesso", student });
  } catch (error) {
    return res.status(500).send({message: "Erro ao criar estudante", error: error.message,});
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
  const { name, email, password } = req.body;

  const studentById = await studentsRepository.getStudentById(id);
  const studentByCode = await studentsRepository.getStudentByCode(code);

  if (!studentById) {
    return res.status(404).send({ message: "Estudante não encontrado" });
  }

  if (studentByCode && studentByCode.id !== id) {
    return res.status(409).send({ message: "Email já cadastrado" });
  }

  const student = await studentsRepository.updateStudent(name, age, email, code, grade);

  return res
    .status(200)
    .send({ message: "Estudente atualizado com sucesso", student });
  } catch (error) {
    return res.status(500).send({message: "Erro ao criar editar o estudante", error: error.message,});
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

  const student = await studentsRepository.getStudentById(id);

  if (!student) {
    return res.status(404).send({ message: "Estudante não encontrado" });
  }

 await studentsRepository.deleteStudent(id);

  return res
    .status(200)
    .send({ message: "Estudante deletado com sucesso", user });
  } catch (error) {
    return res.status(500).send({message: "Erro ao criar exclur o estudante", error: error.message,});   
  }
};
