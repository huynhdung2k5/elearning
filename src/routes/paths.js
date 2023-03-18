// ----------------------------------------------------------------------
// paths routes
// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
} // xử lý nối root và path

const ROOTS = ''; // path gốc
const ROOTS_AUTH = '/auth'; // path auth

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
}; // các routes của path người dùng

export const PATH_ROOTS = {
  root: '/',
  general: {
    overview: path(ROOTS, '/general/overview'),
  },
  subjects: {
    root: path(ROOTS, '/management/subjects'),
    list: path(ROOTS, '/management/subjects/list'),
    update: (id) => path(ROOTS, `/management/subjects/update/${id}`),
    demoUpdate: path(ROOTS, '/management/subjects/update/demo'),
    create: path(ROOTS, '/management/subjects/create'),
    teacherAllocation: path(ROOTS, '/management/subjects/teacher-allocation'),
    classAllocation: path(ROOTS, '/management/subjects/class-allocation'),
  },
  class: {
    root: path(ROOTS, '/management/class'),
    list: path(ROOTS, '/management/class/list'),
    update: (id) => path(ROOTS, `/management/class/update/${id}`),
    demoUpdate: path(ROOTS, '/management/class/update/demo'),
    create: path(ROOTS, '/management/class/create'),
    studentAllocation: path(ROOTS, '/management/subject/student-allocation'),
  },
  teacher: {
    root: path(ROOTS, '/management/teacher'),
    list: path(ROOTS, '/management/teacher/list'),
    update: (id) => path(ROOTS, `/management/teacher/update/${id}`),
    demoUpdate: path(ROOTS, '/management/teacher/update/demo'),
    create: path(ROOTS, '/management/teacher/create'),
  },
  student: {
    root: path(ROOTS, '/management/student'),
    list: path(ROOTS, '/management/student/list'),
    update: (id) => path(ROOTS, `/management/student/update/${id}`),
    demoUpdate: path(ROOTS, '/management/student/update/demo'),
    create: path(ROOTS, '/management/student/create'),
  },
  course: {
    root: path(ROOTS, '/management/course'),
    list: path(ROOTS, '/management/course/list'),
    update: (id) => path(ROOTS, `/management/course/update/${id}`),
    demoUpdate: path(ROOTS, '/management/course/update/demo'),
    create: path(ROOTS, '/management/course/create'),
  },
  test: {
    root: path(ROOTS, '/management/test'),
    list: path(ROOTS, '/management/test/list'),
    update: (id) => path(ROOTS, `/management/test/update/${id}`),
    demoUpdate: path(ROOTS, '/management/test/update/demo'),
    create: path(ROOTS, '/management/test/create'),
  },
  learning: {
    root: path(ROOTS, '/management/learning'),
    list: path(ROOTS, '/management/learning/list'),
    all: path(ROOTS, '/management/learning/all'),
  },
  testing: {
    root: path(ROOTS, '/management/testing'),
    list: path(ROOTS, '/management/testing/list'),
  },
  transcript: {
    root: path(ROOTS, '/management/transcript'),
    list: path(ROOTS, '/management/transcript/list'),
    all: path(ROOTS, '/management/transcript/all'),
  },
  app: {
    notifications: path(ROOTS, '/app/notifications'),
    calendar: path(ROOTS, '/app/calendar'),
    forum: path(ROOTS, '/app/forum'),
    chat: path(ROOTS, '/app/chat'),
  },
  profile: {
    root: path(ROOTS, '/settings/profile'),
  },
  roles: {
    root: path(ROOTS, '/settings/roles'),
    list: path(ROOTS, '/settings/roles/list'),
    update: (id) => path(ROOTS, `/settings/roles/update/${id}`),
    demoUpdate: path(ROOTS, '/settings/roles/update/demo'),
    create: path(ROOTS, '/settings/roles/create'),
    add: path(ROOTS, '/settings/roles/add'),
  },
}; // các routes của path gốc
