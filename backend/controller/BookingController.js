import '../connection/dbconfig.js'
import APIResponse from '../response/APIResponse.js';
import bookingSchemaModel from '../model/BookingModel.js'
export const saveBooking = async (req, res, next) => {
  try {
    let book_detail = req.body;
    const { userId, serviceId } = book_detail;

    console.log("Received booking data:", JSON.stringify(book_detail));

    // 1️⃣ Check if user already booked this service
    const existingBooking = await bookingSchemaModel.findOne({
      userId: userId,
      serviceId: serviceId
    });

    if (existingBooking) {
      return res.status(400).json(new APIResponse(false, null, "You have already booked this service"));
    }

    // 2️⃣ Generate _id
    const booking_list = await bookingSchemaModel.find();
    const len = booking_list.length;
    const _id = len === 0 ? 1 : booking_list[len - 1]._id + 1;

    // 3️⃣ Create new booking
    book_detail = { ...book_detail, _id, info: Date() };
    const saved = await bookingSchemaModel.create(book_detail);

    console.log("Booking saved:", saved);
    res.status(200).json(new APIResponse(true, saved, "Booking saved successfully"));

  } catch (err) {
    console.log("Error saving booking:", err);
    res.status(500).json(new APIResponse(false, null, "Booking not saved successfully"));
  }
};


// export const saveBooking = async (req, res, next) => {
//     var book_detail = req.body;
//     console.log("daat" + book_detail)
//     console.log("daat" + JSON.stringify(book_detail))
//     try {
//         const booking_list = await bookingSchemaModel.find(); 1
//         console.log("list=" + booking_list)
//         var len = booking_list.length;
//         console.log("list=" + len)
//         var _id = len == 0 ? 1 : booking_list[len - 1]._id + 1;
//         console.log("list=" + _id)
//         book_detail = { ...book_detail, '_id': _id, 'info': Date() }
//         console.log("daat" + JSON.stringify(book_detail))
//         const saved = await bookingSchemaModel.create(book_detail);
//         res.status(200).json(new APIResponse(true, saved, "Booking Saved Successfully"));


//     }
//     catch (err) {
// res.status(200).json(new APIResponse(false, "Booking not Saved Successfully"));
// console.log("error"+err)
//     }
// }
 
// export const getAllBookings = async (req, res, next) => {

// try {
//     const userId = req.params.userId;

//     const bookings = await bookingSchemaModel
//       .find({ userId })
//       .populate('serviceId'); 

//     res
//       .status(200)
//       .json(new APIResponse(200, bookings, "User bookings fetched successfully"));
//   } catch (error) {
//     res
//       .status(500)
//       .json(new APIResponse(500, null, "Error fetching user bookings", error));
//   }
 
 
// };
// controllers/bookingController.js
export const getAllBookings = async (req, res, next) => {
  try {
    // Logged-in user id from JWT token
    const userId = req.user;

    // Fetch only bookings of logged-in user
    const bookings = await bookingSchemaModel
      .find({ userId })
      .populate('serviceId'); // populate service details

    res.status(200).json(new APIResponse(true, bookings, "Your bookings fetched successfully"));
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json(new APIResponse(false, null, "Error fetching bookings", error));
  }
};




export const deletebooking = async (req, res, next) => {
  try {
    const id = req.params._id;  
    console.log(" data id is: " + id);

    const book_data = await bookingSchemaModel.findByIdAndDelete(id);  

    if (!book_data) {
      return res.status(200).json(new APIResponse(false, null, "Booking record not found"));
    }

    res.status(200).json(new APIResponse(true, book_data, "Booking deleted successfully"));
  } catch (error) {
    console.error("  Error deleting booking:", error.message);
    
  }
};


// controllers/bookingController.js
export const updateBookingStatus = async (req, res) => {
  try {
    const bookingId = req.params._id;
    const newStatus = req.body.status;

    const updatedBooking = await bookingSchemaModel.findByIdAndUpdate(
      bookingId,
      { status: newStatus },
      { new: true }
    );

    if (!updatedBooking) {
    res.status(202).json(new APIResponse({
        status: false,
        message: "Booking not found"
      }));
    }
    else
    {

   res.status(200).json(new APIResponse({
        status: true,
         data: updatedBooking,
        message: "Booking status updated successfully",
      }));
  
  }
  } catch (err) {
    console.log("Error updating status:", err);
   
  }
};

// admin fetch booking services

export const getPendingBookings = async (req, res) => {
  try {
    const pendingBookings = await bookingSchemaModel.find({ status: "pending" })
      .populate({
        path: 'serviceId',
        populate: {
          path: 'category',       // category ko bhi populate karo
          model: 'category'
        }
      })
      .populate('userId')    //  fetch full user details

    res.status(200).json({
      status: true,
      data: pendingBookings
    });
  } catch (error) {
    console.error("Error fetching pending bookings:", error);
    res.status(500).json({
      status: false,
      message: "Failed to fetch pending bookings"
    });
  }
};

export const getConfirmedBookings = async (req, res) => {
  try {
    const bookings = await bookingSchemaModel.find({ status: "confirmed" })
      .populate({
        path: 'serviceId',
        populate: {
          path: 'category',       //  nested populate for category
          model: 'category'
        }
      })
      .populate('userId'); //  for full user data

    res.status(200).json({
      status: true,
      data: bookings
    });
  } catch (error) {
    console.error("Error fetching confirmed bookings:", error);
    res.status(500).json({
      status: false,
      message: "Failed to fetch confirmed bookings"
    });
  }
};





