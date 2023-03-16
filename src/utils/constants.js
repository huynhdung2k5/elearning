// lodash
import _ from 'lodash';

export const EXAM_RULES_COLOR = {
  'Trắc nghiệm': 'info',
  'Tự luận': 'primary',
  'Thực hành': 'success',
  'Vấn đáp': 'warning',
  'Đồ án': 'info',
  'Báo cáo': 'primary',
  'Bài tập lớn': 'success',
  'Luận văn': 'warning',
  'Niên luận': 'error',
}; // màu của options của biến quy chế thi

export const EXAM_RULES = _.map(_.toPairs(EXAM_RULES_COLOR), ([key, value]) => key); // options quy chế thi

export const EXAM_RULES_OPTIONS = EXAM_RULES.map((option) => ({
  value: option,
  label: option,
}));

export const LESSON_BRANCH = [
  'Khoa học tự nhiên',
  'Khoa học xã hội',
  'Công nghệ và nghệ thuật',
  'Thể chất & quốc phòng',
]; // danh sách các khối ngành
