import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';


const UserSchema = new Schema(
    {
        displayName: { type: String },
        emailAddress: { type: String },
        username: { type: String },
        created: { type: Date, default: Date.now() },
        updated: { type: Date, default: Date.now() }
    });


UserSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', UserSchema);