module.exports = (mongoose) => {
  const Message = mongoose.model(
    "Message",
    mongoose.Schema(
      {
        name: String,
        message: String,
      },
      { timestamps: true }
    )
  );
  return Message;
};
