import User from "../models/userModel.js";

const seedUsers = async () => {
  try {
    const users = [
      { name: "Jesse Skylar", token: "abce23EWIUhdixsa893ue" },
      { name: "Pinkman", token: "abce2e3EWdhcuis32847e" },
      { name: "Sharad", token: "12hjksdh98342ndkjc" },
      { name: "Pallavi", token: "sdjd19283ndfcjn934" },
      { name: "Annu", token: "ND93HSDAJN#Vuwxzkl" },
      { name: "Nuiya", token: "uwerxcbY34hndoiuas12" },
    ];
    await User.deleteMany({});

    const addUsers = await User.insertMany(users, { ordered: false });
    console.log("added users");
  } catch (error) {
    console.log("failed to seed users to collection :(", error);
  }
};

export default seedUsers;
