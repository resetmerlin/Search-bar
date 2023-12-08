import mongoose from 'mongoose';

const { Schema } = mongoose;

const corporateSchema = new Schema({
  회사명: {
    type: String,
    required: true
  },
  종목코드: {
    type: Number,
    required: true,
    unique: true
  },
  업종: {
    type: String,
    required: true
  },
  주요제품: {
    type: String,
    required: true
  },
  상장일: {
    type: String,
    required: true
  },
  결산월: {
    type: String,
    required: true
  },
  대표자명: {
    type: String,
    required: true
  },
  홈페이지: {
    type: String,
    required: false
  },
  지역: {
    type: String,
    required: true
  }
});
const Corporate =
  mongoose.models?.Corporate ||
  mongoose.model('Corporate', corporateSchema, 'search');

export default Corporate;
