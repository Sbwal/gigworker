const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const WorkerSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  workerid: { type: Number, required: false }
});

const GigSchema = new Schema({
  gigtype: { type: String, required: true },
  status: { type: String, enum: ['To Be Approved', 'Open'], default: 'Open' },
  gigid: { type: Number, required: false },
  giggercount: { type: Number, default: 0 }
})

const GiggerSchema = new Schema({
  worker : { type: Schema.Types.ObjectId, ref: 'Worker', required: true },
  gig: { type: Schema.Types.ObjectId, ref: 'Gig', required: true }
})

const User = mongoose.model('User', UserSchema);
const Worker = mongoose.model('Worker', WorkerSchema);
const Gig = mongoose.model('Gig', GigSchema);
const Gigger = mongoose.model('Gigger', GiggerSchema);

module.exports = {
  User,
  Worker,
  Gig,
  Gigger
};
