import { User } from './user.model';

export const findLastStudent = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(2, 7) : undefined;
};
export const generateStudentId = async (): Promise<string> => {
  const currentId = (await findLastStudent()) || (79680).toString();
  let generateId = (Number(currentId) + 1).toString();
  generateId = `S-${generateId}-${new Date().getFullYear()}`;
  return generateId;
};
export const findLastTeacher = async (): Promise<string | undefined> => {
  const lastTeacher = await User.findOne({ role: 'teacher' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastTeacher?.id ? lastTeacher.id.substring(4, 10) : undefined;
};
export const generateTeacherId = async (): Promise<string> => {
  const currentId = (await findLastTeacher()) || (679580).toString();
  let generateId = (Number(currentId) + 2).toString();
  generateId = `TCH-${generateId}-${new Date().getFullYear()}`;
  return generateId;
};

export const findLastAdmin = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastAdmin?.id ? lastAdmin.id.substring(4, 11) : undefined;
};
export const generateAdminId = async (): Promise<string> => {
  const currentId = (await findLastAdmin()) || (8796459).toString();
  let generateId = (Number(currentId) + 3).toString();
  generateId = `ADM-${generateId}-${new Date().getFullYear()}`;
  return generateId;
};
