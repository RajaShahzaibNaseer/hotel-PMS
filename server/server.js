const express = require("express");
const app = express();
const cors = require("cors");
const pool  = require("./db");

//middleware
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

//ROUTES//

// Handling get request to backend
app.get("/", (req, res) => {
    res.send("Hello from the backend");
});

//blocks
//create item
app.post("/blocks", async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Debug log
  
      const { blockname } = req.body;
      console.log("Blockname:", blockname); // Debug log
  
      if (!blockname) {
        return res.status(400).json({ message: "blockname is required" });
      }
  
      const newBlock = await pool.query(
        "INSERT INTO public.blocks (blockname) VALUES($1) RETURNING *;",
        [blockname]
      );
  
      res.json(newBlock.rows[0]);
    } catch (error) {
      console.error("Database Error:", error.message);
      res.status(500).send("Server Error");
    }
  });

//get all items
app.get("/blocks", async (req, res) => {
    try {
        const allBlocks = await pool.query("SELECT * FROM public.blocks");
        res.json(allBlocks.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//get a specific item
app.get("/blocks/:blockID", async (req,res) => {
    try {
        const { blockID } = req.params;
        const Block = await pool.query("SELECT * FROM public.blocks WHERE blockid = $1", [blockID]);
        res.json(Block.rows);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error");
    }
})

//update item
app.put("/blocks/:blockID", async (req,res) => {
    try {
        const { blockID } = req.params;
        const { blockname } = req.body;
        const updateBlock = await pool.query("UPDATE public.blocks SET blockname=$1 WHERE blockid=$2",[blockname,blockID]);
        res.json("Block Updated");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//delete item
app.delete("/blocks/:blockID", async (req,res) => {
    try {
        const { blockID } = req.params;
        const deleteBlock = await pool.query("DELETE FROM public.blocks WHERE blockid=$1",[blockID]);
        res.json("Block Deleted");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})

//departments
//create item
app.post("/departments", async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Debug log
  
      const { departmentname } = req.body;
      console.log("departmentname:", departmentname); // Debug log
  
      if (!departmentname) {
        return res.status(400).json({ message: "departmentname is required" });
      }
  
      const newBlock = await pool.query(
        "INSERT INTO public.departments (departmentname) VALUES($1) RETURNING *;",
        [departmentname]
      );
  
      res.json(newBlock.rows[0]);
    } catch (error) {
      console.error("Database Error:", error.message);
      res.status(500).send("Server Error");
    }
  });

//get all items
app.get("/departments", async (req, res) => {
    try {
        const allDepartments = await pool.query("SELECT * FROM public.departments");
        res.json(allDepartments.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//get a specific item
app.get("/departments/:departmentID", async (req,res) => {
    try {
        const { departmentID } = req.params;
        const department = await pool.query("SELECT * FROM public.departments WHERE departmentid = $1", [departmentID]);
        res.json(department.rows);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error");
    }
})

//update item
app.put("/departments/:departmentID", async (req,res) => {
    try {
        const { departmentID } = req.params;
        const { departmentname } = req.body;
        const updateDepartment = await pool.query("UPDATE public.departments SET departmentname=$1 WHERE departmentid=$2",[blockname,blockID]);
        res.json("department Updated");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//delete item
app.delete("/departments/:departmentID", async (req,res) => {
    try {
        const { departmentID } = req.params;
        const deleteDepartment = await pool.query("DELETE FROM public.departments WHERE departmentid=$1",[departmentID]);
        res.json("Block Deleted");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})


//conference rooms
app.post("/conference", async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Debug log
  
      const { conferenceRoomName, conferenceRoomDesc } = req.body; // Destructure both fields
      console.log("Conference Name:", conferenceRoomName); // Debug log
      console.log("Description:", conferenceRoomDesc); // Debug log
  
      // Validate that both fields are provided
      if (!conferenceRoomName || !conferenceRoomDesc) {
        return res.status(400).json({ message: "Conference name and description are required" });
      }
  
      // Insert both conference name and description into the database
      const newConference = await pool.query(
        "INSERT INTO public.conferencerooms (conferenceroomname, description) VALUES($1, $2);",
        [conferenceRoomName, conferenceRoomDesc]
      );
  
      // Respond with the newly created conference data
      res.json(newConference.rows[0]);
    } catch (error) {
      console.error("Database Error:", error.message);
      res.status(500).send("Server Error");
    }
  });
  
//get all items
app.get("/conference", async (req, res) => {
    try {
        const allConferenceRooms = await pool.query("SELECT * FROM public.conferencerooms");
        res.json(allConferenceRooms.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//get a specific item
app.get("/conference/:conferenceID", async (req,res) => {
    try {
        const { conferenceID } = req.params;
        const conference = await pool.query("SELECT * FROM public.conferencerooms WHERE conferenceroomid = $1", [conferenceID]);
        res.json(conference.rows);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error");
    }
})

//update item
app.put("/conference/:conferenceID", async (req,res) => {
    try {
        const { conferenceID } = req.params;
        const { conferenceRoomName,conferenceRoomDesc } = req.body;
        const updateDepartment = await pool.query("UPDATE public.conferencerooms SET conferenceroomname=$1, description=$2 WHERE conferenceroomid=$3;",[conferenceRoomName,conferenceRoomDesc,conferenceID]);
        res.json("conference room Updated");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//delete item
app.delete("/conference/:conferenceID", async (req,res) => {
    try {
        const { conferenceID } = req.params;
        const deleteConferenceRoom = await pool.query("DELETE FROM public.conferencerooms WHERE conferenceroomid=$1",[conferenceID]);
        res.json("Block Deleted");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})

//Floors
//add floors
app.post("/floors", async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Debug log
  
      const { floorName, blockID } = req.body; // Destructure both fields
      console.log("Conference Name:", floorName); // Debug log
      console.log("Description:", blockID); // Debug log
  
      // Validate that both fields are provided
      if (!floorName || !blockID) {
        return res.status(400).json({ message: "floor name and block ID are required" });
      }
  
      // Insert both conference name and description into the database
      const newFloor = await pool.query(
        "INSERT INTO public.floors (floorname, blockid) VALUES($1, $2);",
        [floorName, blockID]
      );
  
      // Respond with the newly created conference data
      res.json(newFloor.rows[0]);
    } catch (error) {
      console.error("Database Error:", error.message);
      res.status(500).send("Server Error");
    }
  });
  
//get all items
app.get("/floors", async (req, res) => {
    try {
        const allFloors = await pool.query("SELECT * FROM public.floors");
        res.json(allFloors.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//get a specific item
app.get("/floors/:floorID", async (req,res) => {
    try {
        const { floorID } = req.params;
        const floor = await pool.query("SELECT * FROM public.blocks WHERE blockid = $1", [floorID]);
        res.json(floor.rows);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error");
    }
})

//update item
app.put("/floors/:floorID", async (req,res) => {
    try {
        const { floorID } = req.params;
        const { floorName,blockID } = req.body;
        const updateFloor = await pool.query("UPDATE public.floors SET floorname=$1, blockid=$2 WHERE floorid=$3;",[floorName,blockID,floorID]);
        res.json("conference room Updated");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//delete item
app.delete("/floors/:floorID", async (req,res) => {
    try {
        const { floorID } = req.params;
        const deleteFloor = await pool.query("DELETE FROM public.floors WHERE floorid=$1",[floorID]);
        res.json("floor Deleted");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})


//meal plan rates
//add meal plan
app.post("/mealplanrates", async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Debug log
  
      const { mealPlanName,mealPlanPrice } = req.body;
      console.log("mealPlanName:", mealPlanName); // Debug log
      console.log("price:",mealPlanPrice);
  
      if (!mealPlanName && !mealPlanPrice) {
        return res.status(400).json({ message: "meal plan name and price are required" });
      }
  
      const newMealPlan = await pool.query(
        "INSERT INTO public.mealplanrates (mealplanname, price) VALUES($1 , $2);",
        [mealPlanName,mealPlanPrice]
      );
  
      res.json(newMealPlan.rows[0]);
    } catch (error) {
      console.error("Database Error:", error.message);
      res.status(500).send("Server Error");
    }
  });

//get all items
app.get("/mealplanrates", async (req, res) => {
    try {
        const allMealPlans = await pool.query("SELECT * FROM public.mealplanrates");
        res.json(allMealPlans.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//get a specific item
app.get("/mealplanrates/:mealPlanID", async (req,res) => {
    try {
        const { mealPlanID } = req.params;
        const mealPlan = await pool.query("SELECT * FROM public.mealplanrates WHERE mealplanrateid = $1", [mealPlanID]);
        res.json(mealPlan.rows);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error");
    }
})

//update item
app.put("/mealplanrates/:mealPlanID", async (req,res) => {
    try {
        const { mealPlanID } = req.params;
        const { mealPlanName,price } = req.body;
        const updateMealPlan = await pool.query("UPDATE public.mealplanrates SET mealplanname=$1, price= $2 WHERE mealplanrateid=$3;",[mealPlanName,price,mealPlanID]);
        res.json("department Updated");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//delete item
app.delete("/mealplanrates/:mealPlanID", async (req,res) => {
    try {
        const { mealPlanID } = req.params;
        const deleteMealPlan = await pool.query("DELETE FROM public.mealplanrates WHERE mealplanrateid=$1",[mealPlanID]);
        res.json("meal plan Deleted");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})

//pax rates
//adding pax rate
app.post("/paxrates", async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Debug log
  
      const { paxRateName,paxRatePrice } = req.body;
      console.log("paxRateName:", paxRateName); // Debug log
      console.log("price:",paxRatePrice);
  
      if (!paxRateName && !paxRatePrice) {
        return res.status(400).json({ message: "meal plan name and price are required" });
      }
  
      const newpaxRate = await pool.query(
        "INSERT INTO public.paxrates (paxratename, price) VALUES($1 , $2);",
        [paxRateName,paxRatePrice]
      );
  
      res.json(newpaxRate.rows[0]);
    } catch (error) {
      console.error("Database Error:", error.message);
      res.status(500).send("Server Error");
    }
  });

//get all items
app.get("/paxrates", async (req, res) => {
    try {
        const allpaxRates = await pool.query("SELECT * FROM public.paxrates");
        res.json(allpaxRates.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//get a specific item
app.get("/paxrates/:paxRateID", async (req,res) => {
    try {
        const { paxRateID } = req.params;
        const paxRate = await pool.query("SELECT * FROM public.paxrates WHERE paxrateid = $1", [paxRateID]);
        res.json(paxRate.rows);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error");
    }
})

//update item
app.put("/paxrates/:paxRateID", async (req,res) => {
    try {
        const { paxRateID } = req.params;
        const { paxRateName,price } = req.body;
        const updatepaxRate = await pool.query("UPDATE public.paxrates SET paxratename=$1, price= $2 WHERE paxRaterateid=$3;",[paxRateName,price,paxRateID]);
        res.json("pax rate Updated");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//delete item
app.delete("/paxrates/:paxRateID", async (req,res) => {
    try {
        const { paxRateID } = req.params;
        const deletepaxRate = await pool.query("DELETE FROM public.paxrates WHERE paxrateid=$1",[paxRateID]);
        res.json("pax rate Deleted");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})

//adding services
app.post("/services", async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Debug log
  
      const { serviceName,servicePrice } = req.body;
      console.log("serviceName:", serviceName); // Debug log
      console.log("price:",servicePrice);
  
      if (!serviceName && !servicePrice) {
        return res.status(400).json({ message: "service name and price are required" });
      }
  
      const newservice = await pool.query(
        "INSERT INTO public.auxiliaryservices (servicename, price) VALUES($1 , $2);",
        [serviceName,servicePrice]
      );
  
      res.json(newservice.rows[0]);
    } catch (error) {
      console.error("Database Error:", error.message);
      res.status(500).send("Server Error");
    }
  });

//get all items
app.get("/services", async (req, res) => {
    try {
        const allservices = await pool.query("SELECT * FROM public.auxiliaryservices");
        res.json(allservices.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//get a specific item
app.get("/services/:serviceID", async (req,res) => {
    try {
        const { serviceID } = req.params;
        const service = await pool.query("SELECT * FROM public.auxiliaryservices WHERE serviceid = $1", [serviceID]);
        res.json(service.rows);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error");
    }
})

//update item
app.put("/services/:serviceID", async (req,res) => {
    try {
        const { serviceID } = req.params;
        const { serviceName,price } = req.body;
        const updateservice = await pool.query("UPDATE public.auxiliaryservices SET servicename=$1, price= $2 WHERE servicerateid=$3;",[serviceName,price,serviceID]);
        res.json("pax rate Updated");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//delete item
app.delete("/services/:serviceID", async (req,res) => {
    try {
        const { serviceID } = req.params;
        const deleteservice = await pool.query("DELETE FROM public.auxiliaryservices WHERE serviceid=$1",[serviceID]);
        res.json("pax rate Deleted");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})

//adding job titles
app.post("/jobTitle", async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Debug log
  
      const { jobTitleName,departmentID } = req.body;
      console.log("jobTitleName:", jobTitleName); // Debug log
      console.log("departmentID:",departmentID);
  
      if (!jobTitleName && !departmentID) {
        return res.status(400).json({ message: "job title name and department id are required" });
      }
  
      const newjobTitle = await pool.query(
        "INSERT INTO public.jobtitles (jobtitlename, departmentid) VALUES($1 , $2);",
        [jobTitleName,departmentID]
      );
  
      res.json(newjobTitle.rows[0]);
    } catch (error) {
      console.error("Database Error:", error.message);
      res.status(500).send("Server Error");
    }
  });

//get all items
app.get("/jobTitle", async (req, res) => {
    try {
        const alljobTitle = await pool.query("SELECT * FROM public.jobtitles");
        res.json(alljobTitle.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//get a specific item
app.get("/jobTitle/:jobTitleID", async (req,res) => {
    try {
        const { jobTitleID } = req.params;
        const jobTitle = await pool.query("SELECT * FROM public.jobtitles WHERE jobtitleid = $1", [jobTitleID]);
        res.json(jobTitle.rows);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error");
    }
})

//update item
app.put("/jobTitle/:jobTitleID", async (req,res) => {
    try {
        const { jobTitleID } = req.params;
        const { jobTitleName,departmentID } = req.body;
        const updatejobTitle = await pool.query("UPDATE public.jobtitles SET jobtitleid=$1, departmentid= $2 WHERE jobtitleid=$3;",[jobTitleName,departmentID,jobTitleID]);
        res.json("pax rate Updated");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//delete item
app.delete("/jobTitle/:jobTitleID", async (req,res) => {
    try {
        const { jobTitleID } = req.params;
        const deletejobTitle = await pool.query("DELETE FROM public.jobtitles WHERE jobtitleid=$1",[jobTitleID]);
        res.json("pax rate Deleted");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})

//add guests
app.post("/guests", async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      gender,
      nationality,
      identificationNo,
      expiryDate,
      phoneNo,
      email,
      residentialAddress,
      emergencyContact,
      emergencyPhone,
      emergencyRelationship,
      preferredRoomType,
      preferredMealPlan,
      specialNeeds,
      previousStays,
      loyaltyProgram,
      association
    } = req.body;

    const newGuest = await pool.query(
      `INSERT INTO guests 
      (full_name, date_of_birth, gender, nationality, identification_no, expiry_date, phone_no, email, residential_address, 
       emergency_contact, emergency_phone, emergency_relationship, preferred_room_type, preferred_meal_plan, special_needs, 
       previous_stays, loyalty_program, association) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) 
      RETURNING *`,
      [
        fullName,
        dateOfBirth,
        gender,
        nationality,
        identificationNo,
        expiryDate,
        phoneNo,
        email,
        residentialAddress,
        emergencyContact,
        emergencyPhone,
        emergencyRelationship,
        preferredRoomType,
        preferredMealPlan,
        specialNeeds,
        previousStays,
        loyaltyProgram,
        association
      ]
    );

    res.json(newGuest.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

//get all items
app.get("/guests", async (req, res) => {
    try {
        const allGuests = await pool.query("SELECT * FROM public.guests");
        res.json(allGuests.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//delete item
app.delete("/guests/:guestID", async (req,res) => {
    try {
        const { guestID } = req.params;
        const deleteGuest = await pool.query("DELETE FROM public.guests WHERE guestID=$1",[guestID]);
        res.json("guest Deleted");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})

//rooms
//add guests
app.post("/rooms", async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Debug log
  
      const { roomNumber, floorID, roomTypeID, roomStatus, roomPrice} = req.body;
      console.log("guestName:", roomNumber); // Debug log
      console.log("floorID:",floorID);
      console.log("guestProfile:",roomTypeID);
      console.log("guestProfile:",roomStatus);

      if (!roomNumber && !floorID && !roomTypeID && !roomStatus) {
        return res.status(400).json({ message: "Guest name and profile are required" });
      }
  
      const newRoom = await pool.query(
        "INSERT INTO public.rooms (roomnumber, floorid, roomtypeid, status) VALUES($1, $2, $3, $4 );",
        [roomNumber,floorID,roomTypeID,roomStatus]
      );
  
      res.json(newRoom.rows[0]);
    } catch (error) {

      console.error("Database Error:", error.message);
      res.status(500).send("Server Error");
    }
  });

//get all items
app.get("/rooms", async (req, res) => {
    try {
        const allRooms = await pool.query("SELECT * FROM public.rooms");
        res.json(allRooms.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//delete item
app.delete("/rooms/:roomID", async (req,res) => {
    try {
        const { roomID } = req.params;
        const deleteRoom = await pool.query("DELETE FROM public.rooms WHERE roomid=$1",[roomID]);
        res.json("guest Deleted");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})

//roomTypes
//add roomtypes
app.post("/roomtypes", async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Debug log
  
      const { roomTypeName,roomTypePrice} = req.body;
      console.log("guestName:", roomTypeName); // Debug log
      console.log("guestProfile:",roomTypePrice);
  
      if (!roomTypeName && !roomTypePrice) {
        return res.status(400).json({ message: "Guest name and profile are required" });
      }
  
      const newRoomType = await pool.query(
        "INSERT INTO public.roomtypes (roomtypename, price) VALUES($1 , $2);",
        [roomTypeName,roomTypePrice]
      );
  
      res.json(newRoomType.rows[0]);
    } catch (error) {

      console.error("Database Error:", error.message);
      res.status(500).send("Server Error");
    }
  });

//get all items
app.get("/roomtypes", async (req, res) => {
    try {
        const allRoomTypes = await pool.query("SELECT * FROM public.roomtypes");
        res.json(allRoomTypes.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//delete item
app.delete("/roomtypes/:roomTypeID", async (req,res) => {
    try {
        const { roomTypeID } = req.params;
        const deleteGuest = await pool.query("DELETE FROM public.roomtypes WHERE roomtypeid=$1",[roomTypeID]);
        res.json("guest Deleted");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})

//companies
//adding companies
app.post("/company", async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Debug log
  
      // Destructure all fields from formData
      const {
        companyName,
        registrationNo,
        taxIdentificationNo,
        businessType,
        physicalAddress,
        billingAddress,
        officePhoneNo,
        officeEmail,
        website,
        fullName,
        designation,
        email,
        phoneNo,
      } = req.body;
  
      // Basic validation to ensure required fields are present
      if (!companyName || !registrationNo || !taxIdentificationNo) {
        return res.status(400).json({
          message: "Company Name, Registration No, and Tax Identification No are required",
        });
      }
  
      // SQL query to insert data into the database
      const newCompany = await pool.query(
        `INSERT INTO public.companies 
        (companyname, registrationno, taxidentificationno, businesstype, physicaladdress, 
        billingaddress, officephoneno, officeemail, website, fullname, designation, email, phoneno) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
        RETURNING *;`,
        [
          companyName,
          registrationNo,
          taxIdentificationNo,
          businessType,
          physicalAddress,
          billingAddress,
          officePhoneNo,
          officeEmail,
          website,
          fullName,
          designation,
          email,
          phoneNo,
        ]
      );
  
      res.json(newCompany.rows[0]); // Send back the inserted record
    } catch (error) {
      console.error("Database Error:", error.message);
      res.status(500).send("Server Error");
    }
  });
  
//get all items
app.get("/roomtypes", async (req, res) => {
    try {
        const allRoomTypes = await pool.query("SELECT * FROM public.roomtypes");
        res.json(allRoomTypes.rows)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

//delete item
app.delete("/roomtypes/:roomTypeID", async (req,res) => {
    try {
        const { roomTypeID } = req.params;
        const deleteGuest = await pool.query("DELETE FROM public.roomtypes WHERE roomtypeid=$1",[roomTypeID]);
        res.json("guest Deleted");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})

//we are working here
//agents
//adding agents
app.post("/agents", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debug log

    // Destructure all fields from formData
    const {
      agencyName,
      agentFullName,
      registrationNo,
      taxIdentificationNo,
      physicalAddress,
      agencyEmail,
      agencyPhoneNo,
      website,
      fullName,
      designation,
      email,
      phoneNo,
    } = req.body;

    // Basic validation to ensure required fields are present
    if (!agencyName || !registrationNo || !taxIdentificationNo) {
      return res.status(400).json({
        message: "Agency Name, Registration No, and Tax Identification No are required",
      });
    }

    // SQL query to insert data into the database
    const newAgency = await pool.query(
      `INSERT INTO public.agents 
      (agencyname, agentfullname, registrationno, taxidentificationno, physicaladdress, 
      agencyemail, agencyphoneno, website, fullname, designation, email, phoneno) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
      RETURNING *;`,
      [
        agencyName,
        agentFullName,
        registrationNo,
        taxIdentificationNo,
        physicalAddress,
        agencyEmail,
        agencyPhoneNo,
        website,
        fullName,
        designation,
        email,
        phoneNo,
      ]
    );

    res.json(newAgency.rows[0]); // Send back the inserted record
  } catch (error) {
    console.error("Database Error:", error.message);
    res.status(500).send("Server Error");
  }
});


//we are working here
//groups
app.post("/groups", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debug log

    // Destructure all fields from formData
    const {
      groupName,
      associatedWith,
      fullName,
      email,
      phoneNo,
    } = req.body;

    // Basic validation to ensure required fields are present
    if (!groupName || !associatedWith) {
      return res.status(400).json({
        message: "Group Name and Associated company or booking agent are required",
      });
    }

    // SQL query to insert data into the database
    const newGroup = await pool.query(
      `INSERT INTO public.groups 
      (groupname, associatedwith fullname, email, phoneno) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *;`,
      [
        groupName,
        associatedWith,
        fullName,
        email,
        phoneNo,
      ]
    );

    res.json(newGroup.rows[0]); // Send back the inserted record
  } catch (error) {
    console.error("Database Error:", error.message);
    res.status(500).send("Server Error");
  }
});


//server starting
app.listen(PORT, () =>{
    console.log(`server started on port -> ${PORT}`)
});
