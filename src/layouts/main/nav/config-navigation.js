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
  permission: icon('permission'),
  studying: icon('studying'),
  testing: icon('testing'),
  transcript: icon('transcript'),
}; // iconlist

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [{ title: 'overview', path: PATH_ROOTS.general.overview, icon: ICONS.overview }],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // Subject

      {
        title: 'subject',
        path: PATH_ROOTS.subject.root,
        icon: ICONS.subject,
        roles: ['admin'],
        children: [
          { title: 'list-subject', path: PATH_ROOTS.subject.list },
          { title: 'update-subject', path: PATH_ROOTS.subject.demoUpdate },
          { title: 'create-subject', path: PATH_ROOTS.subject.create },
          { title: 'teacher-allocation', path: PATH_ROOTS.subject.teacherAllocation },
          { title: 'class-allocation', path: PATH_ROOTS.subject.classAllocation },
        ],
      },
      // Class

      {
        title: 'class',
        path: PATH_ROOTS.class.root,
        icon: ICONS.class,
        children: [
          { title: 'list-class', path: PATH_ROOTS.class.list },
          { title: 'update-class', path: PATH_ROOTS.class.demoUpdate },
          { title: 'create-class', path: PATH_ROOTS.class.create },
          { title: 'student-allocation', path: PATH_ROOTS.class.studentAllocation },
        ],
      },
      // Class

      {
        title: 'teacher',
        path: PATH_ROOTS.teacher.root,
        icon: ICONS.teacher,
        children: [
          { title: 'list-teacher', path: PATH_ROOTS.teacher.list },
          { title: 'update-teacher', path: PATH_ROOTS.teacher.demoUpdate },
          { title: 'create-teacher', path: PATH_ROOTS.teacher.create },
        ],
      },
      // Student

      {
        title: 'student',
        path: PATH_ROOTS.student.root,
        icon: ICONS.student,
        children: [
          { title: 'list-student', path: PATH_ROOTS.student.list },
          { title: 'update-student', path: PATH_ROOTS.student.demoUpdate },
          { title: 'create-student', path: PATH_ROOTS.student.create },
        ],
      },
      // Course

      {
        title: 'course',
        path: PATH_ROOTS.course.root,
        icon: ICONS.course,
        children: [
          { title: 'list-course', path: PATH_ROOTS.course.list },
          { title: 'update-course', path: PATH_ROOTS.course.demoUpdate },
          { title: 'create-course', path: PATH_ROOTS.course.create },
        ],
      },
      // Test

      {
        title: 'test',
        path: PATH_ROOTS.test.root,
        icon: ICONS.test,
        children: [
          { title: 'list-test', path: PATH_ROOTS.test.list },
          { title: 'update-test', path: PATH_ROOTS.test.demoUpdate },
          { title: 'create-test', path: PATH_ROOTS.test.create },
        ],
      },
      // online studying

      {
        title: 'studying',
        path: PATH_ROOTS.studying.root,
        icon: ICONS.studying,
        children: [
          { title: 'list-studying', path: PATH_ROOTS.studying.list },
          { title: 'all-studying', path: PATH_ROOTS.studying.all },
        ],
      },
      // online testing

      {
        title: 'testing',
        path: PATH_ROOTS.testing.root,
        icon: ICONS.testing,
        children: [{ title: 'list-testing', path: PATH_ROOTS.testing.list }],
      },
      {
        title: 'transcript',
        path: PATH_ROOTS.transcript.root,
        icon: ICONS.transcript,
        children: [
          { title: 'list-transcript', path: PATH_ROOTS.transcript.list },
          { title: 'all-transcript', path: PATH_ROOTS.transcript.all },
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
      },
      {
        title: 'calendar',
        path: PATH_ROOTS.app.calendar,
        icon: ICONS.calendar,
      },
      {
        title: 'forum',
        path: PATH_ROOTS.app.forum,
        icon: ICONS.forum,
      },
      {
        title: 'chat',
        path: PATH_ROOTS.app.chat,
        icon: ICONS.chat,
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
      },

      {
        title: 'permission',
        path: PATH_ROOTS.permission.root,
        icon: ICONS.permission,
        children: [
          { title: 'list-permission', path: PATH_ROOTS.permission.list },
          { title: 'change-permission', path: PATH_ROOTS.permission.change },
          { title: 'update-permission', path: PATH_ROOTS.permission.demoUpdate },
          { title: 'create-permission', path: PATH_ROOTS.permission.create },
        ],
      },
    ],
  },
];

export default navConfig;
