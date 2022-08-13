//PACKAGE
const express = require("express");
const cors = require("cors");
const sequelize = require("./model/connection");
const path = require("path");
const users = require("./routes/users_routes");
const events = require("./routes/events_routes");
const participants = require("./routes/participants_routes");
const event_participants = require("./routes/event_participants_routes");
// const admin_seeder = require("./model/seeder/admin_seed");
// const participants_seeder = require("./model/seeder/participants_seed");
// const events_seeder = require("./model/seeder/events_seed");
// const event_participants_seeder = require("./model/seeder/event_participants_seed");
require("dotenv").config();
const app = express();
// const PORT = process.env.PORT;

//MIDDLEWARE
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

sequelize
  .sync()
  .finally(async () => {
    // await admin_seeder();
    // await participants_seeder();
    // await event_participants_seeder();
    // await events_seeder();
  })
  .then(() => {
    console.log(`
      mmm                                       m             m                 
    m"   "  mmm   m mm   m mm    mmm    mmm   mm#mm         mm#mm   mmm         
    #      #" "#  #"  #  #"  #  #"  #  #"  "    #             #    #" "#        
    #      #   #  #   #  #   #  #""""  #        #             #    #   #        
     "mmm" "#m#"  #   #  #   #  "#mm"  "#mm"    "mm           "mm  "#m#"   
    
        #           m           #
     mmm#   mmm   mm#mm   mmm   #mmm    mmm    mmm    mmm
    #" "#  "   #    #    "   #  #" "#  "   #  #   "  #"  #
    #   #  m"""#    #    m"""#  #   #  m"""#   """m  #""""
    "#m##  "mm"#    "mm  "mm"#  ##m#"  "mm"#  "mmm"  "#mm" 
    `);
  });

//ROUTES
app.use("/api", users);
app.use("/api", events);
app.use("/api", participants);
app.use("/api", event_participants);

// //LISTENER
// app.listen(PORT, () => {
//   console.log(`listen port ` + PORT);
// });
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listen port ` + port);
});
