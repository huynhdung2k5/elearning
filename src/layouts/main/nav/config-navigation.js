// routes
import { PATH_ROOTS } from '../../../routes/paths';
// components
import Image from '../../../components/image';

// ----------------------------------------------------------------------

const icon = (name) => (
  <Image
    disabledEffect
    ratio="1/1"
    src={`/assets/images/navbar/${name}.png`}
    sx={{ width: 24, height: 24 }}
  />
);

const ICONS = {
  overview: icon('overview'),
  class: icon('class'),
  teacher: icon('teacher'),
  student: icon('student'),
  subject: icon('subject'),
  calendar: icon('calendar'),
  chat: icon('chat'),
  course: icon('course'),
  forum: icon('forum'),
  notifications: icon('notification'),
  profile: icon('profile'),
  test: icon('test'),
  roles: icon('roles'),
  learning: icon('learning'),
  testing: icon('testing'),
  transcript: icon('transcript'),
}; // iconlist

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'overview',
        path: PATH_ROOTS.general.overview,
        icon: ICONS.overview,
        permission: 'LIST_OVERVIEW',
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // Subject

      {
        title: 'subjects',
        path: PATH_ROOTS.subjects.root,
        icon: ICONS.subject,
        permissions: [
          'GET_SUBJECT_LIST',
          'UPDATE_SUBJECT',
          'CREATE_SUBJECT',
          'ALLOC_TEACHER',
          'GET_CLASS_LIST',
        ],
        children: [
          {
            title: 'list-subject',
            path: PATH_ROOTS.subjects.list,
            permission: 'GET_SUBJECT_LIST',
          },
          {
            title: 'update-subject',
            path: PATH_ROOTS.subjects.demoUpdate,
            permission: 'UPDATE_SUBJECT',
          },
          {
            title: 'create-subject',
            path: PATH_ROOTS.subjects.create,
            permission: 'CREATE_SUBJECT',
          },
          {
            title: 'teacher-allocation',
            path: PATH_ROOTS.subjects.teacherAllocation,
            permission: 'ALLOC_TEACHER',
          },
          {
            title: 'class-allocation',
            path: PATH_ROOTS.subjects.classAllocation,
            permission: 'GET_CLASS_LIST',
          },
        ],
      },
      // Class

      {
        title: 'class',
        path: PATH_ROOTS.class.root,
        icon: ICONS.class,
        permissions: ['GET_CLASS_LIST', 'UPDATE_CLASS', 'ALLOC_STUDENT'],
        children: [
          { title: 'list-class', path: PATH_ROOTS.class.list, permission: 'GET_CLASS_LIST' },
          {
            title: 'update-class',
            path: PATH_ROOTS.class.demoUpdate,
            permission: 'UPDATE_CLASS',
          },
          { title: 'create-class', path: PATH_ROOTS.class.create, permission: 'CREATE_CLASS' },
          {
            title: 'student-allocation',
            path: PATH_ROOTS.class.studentAllocation,
            permission: 'ALLOC_STUDENT',
          },
        ],
      },
      // Class

      {
        title: 'teacher',
        path: PATH_ROOTS.teacher.root,
        icon: ICONS.teacher,
        permissions: ['GET_TEACHER_LIST', 'UPDATE_TEACHER', 'CREATE_TEACHER'],
        children: [
          {
            title: 'list-teacher',
            path: PATH_ROOTS.teacher.list,
            permission: 'GET_TEACHER_LIST',
          },
          {
            title: 'update-teacher',
            path: PATH_ROOTS.teacher.demoUpdate,
            permission: 'UPDATE_TEACHER',
          },
          {
            title: 'create-teacher',
            path: PATH_ROOTS.teacher.create,
            permission: 'CREATE_TEACHER',
          },
        ],
      },
      // Student

      {
        title: 'student',
        path: PATH_ROOTS.student.root,
        icon: ICONS.student,
        permissions: ['GET_STUDENT_LIST', 'UPDATE_STUDENT', 'CREATE_STUDENT'],
        children: [
          {
            title: 'list-student',
            path: PATH_ROOTS.student.list,
            permission: 'GET_STUDENT_LIST',
          },
          {
            title: 'update-student',
            path: PATH_ROOTS.student.demoUpdate,
            permission: 'UPDATE_STUDENT',
          },
          {
            title: 'create-student',
            path: PATH_ROOTS.student.create,
            permission: 'CREATE_STUDENT',
          },
        ],
      },
      // Course

      {
        title: 'course',
        path: PATH_ROOTS.course.root,
        icon: ICONS.course,
        permissions: ['GET_COURSE_LIST', 'UPDATE_COURSE', 'CREATE_COURSE'],
        children: [
          { title: 'list-course', path: PATH_ROOTS.course.list, permission: 'GET_COURSE_LIST' },
          {
            title: 'update-course',
            path: PATH_ROOTS.course.demoUpdate,
            permission: 'UPDATE_COURSE',
          },
          { title: 'create-course', path: PATH_ROOTS.course.create, permission: 'CREATE_COURSE' },
        ],
      },
      // Test

      {
        title: 'test',
        path: PATH_ROOTS.test.root,
        icon: ICONS.test,
        permissions: ['GET_TEST_LIST', 'UPDATE_TEST', 'CREATE_TEST'],
        children: [
          { title: 'list-test', path: PATH_ROOTS.test.list, permission: 'GET_TEST_LIST' },
          { title: 'update-test', path: PATH_ROOTS.test.demoUpdate, permission: 'UPDATE_TEST' },
          { title: 'create-test', path: PATH_ROOTS.test.create, permission: 'CREATE_TEST' },
        ],
      },
      // online studying

      {
        title: 'learning',
        path: PATH_ROOTS.learning.root,
        icon: ICONS.learning,
        permissions: ['GET_MY_COURSE', 'GET_ALL_COURSES'],
        children: [
          { title: 'list-learning', path: PATH_ROOTS.learning.list, permission: 'GET_MY_COURSE' },
          { title: 'all-learning', path: PATH_ROOTS.learning.all, permission: 'GET_ALL_COURSES' },
        ],
      },
      // online testing

      {
        title: 'testing',
        path: PATH_ROOTS.testing.root,
        icon: ICONS.testing,
        permissions: ['GET_MY_TEST'],
        children: [
          { title: 'list-testing', path: PATH_ROOTS.testing.list, permission: 'GET_MY_TEST' },
        ],
      },
      {
        title: 'transcript',
        path: PATH_ROOTS.transcript.root,
        icon: ICONS.transcript,
        permissions: ['GET_TRANSCRIPT'],
        children: [
          {
            title: 'list-transcript',
            path: PATH_ROOTS.transcript.list,
            permission: 'GET_TRANSCRIPT',
          },
        ],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------

  {
    subheader: 'app',
    items: [
      {
        title: 'notifications',
        path: PATH_ROOTS.app.notifications,
        icon: ICONS.notifications,
        permission: 'LIST_NOTIFICATION',
      },
      {
        title: 'calendar',
        path: PATH_ROOTS.app.calendar,
        icon: ICONS.calendar,
        permission: 'GET_CALENDAR',
      },
      {
        title: 'forum',
        path: PATH_ROOTS.app.forum,
        icon: ICONS.forum,
        permission: 'FORUM_CHAT',
      },
      {
        title: 'chat',
        path: PATH_ROOTS.app.chat,
        icon: ICONS.chat,
        permission: 'ALLOW_CHATGPT',
      },
    ],
  },
  // Cài đặt
  // ----------------------------------------------------------------------

  {
    subheader: 'settings',
    items: [
      {
        title: 'profile',
        path: PATH_ROOTS.profile.root,
        icon: ICONS.profile,
        permission: 'UPDATE_PROFILE',
      },

      {
        title: 'roles',
        path: PATH_ROOTS.roles.root,
        icon: ICONS.roles,
        permissions: ['READ_ROLE', 'ADD_ROLE', 'UPDATE_ROLE', 'READ_ROLE'],
        children: [
          { title: 'list-roles', path: PATH_ROOTS.roles.list, permission: 'READ_ROLE' },
          { title: 'add-roles', path: PATH_ROOTS.roles.add, permission: 'ADD_ROLE' },
          { title: 'update-roles', path: PATH_ROOTS.roles.demoUpdate, permission: 'UPDATE_ROLE' },
          { title: 'create-roles', path: PATH_ROOTS.roles.create, permission: 'CREATE_ROLE' },
        ],
      },
    ],
  },
];

export default navConfig;
