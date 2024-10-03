import { model, models, Schema } from "mongoose";

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Make sure the ref is correctly pointing to the 'User' model
  },
  
  title: {
    type: String,
    required: [true, 'Title is Required']  // Adds the title field with a validation message
  },

  post: {
    type: String,
    required: [true, 'Post Idea is Required']
  },
  
  tag: {
    type: String,
    required: [true, 'Tag is Required']
  },
  
  date: {
    type: Date,
    default: Date.now  // Automatically sets the current date when the document is created
  }
});

const Post = models.Post || model('Post', PostSchema);

export default Post;
