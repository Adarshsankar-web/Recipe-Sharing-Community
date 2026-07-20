const mongoose = require("mongoose");

const uri =
"mongodb+srv://adharshsankar09_db_user:hRuy0Hw1FJyvkeLK@cluster00.hh032tr.mongodb.net/recipeCommunity?retryWrites=true&w=majority&appName=Cluster00";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Connected");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });