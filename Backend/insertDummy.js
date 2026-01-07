import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({ name: String });
const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://127.0.0.1:27017/ai-resume-builder', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB Connected');

  await User.create({ name: 'Test User' });
  console.log('Dummy user inserted. Check Compass now!');
  process.exit();
})
.catch(err => console.error(err));
