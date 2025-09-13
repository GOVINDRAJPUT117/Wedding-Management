// import '../connection/dbconfig.js'
// import rs from 'randomstring' 
// import path from 'path'
// import url from 'url'
// import APIResponse from '../response/APIResponse.js'
// import serviceSchemaModel from '../model/services.js'
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// save service
// export var saveService = async (req,res,next)=>
// {
//     var service_detail=req.body;
//     var img_file = req.files.service_image;

//     var service_list = await serviceSchemaModel.find();
//      var len = service_list.length;
//       var _id = (len==0) ? 1 :service_list[len-1]._id+1;

//       var image_name = Date.now()+"-"+rs.generate()+"-"+img_file.name;
      
//     service_detail = {...service_detail,'_id':_id,'service_image':image_name,"info":Date()};

//     try
//     {
//         var resp = await serviceSchemaModel.create(service_detail);  
        
//      var upload_path = path.join(__dirname,"../../frontend/public/upload/service",image_name)

//         img_file.mv(upload_path);
//         res.status(200).json(new APIResponse(true,resp,"service Details Save"));

//     }
//         catch(err)
//     {
//         console.log("Save service Image : "+err);
//         res.status(200).json(new APIResponse(false,null,"service Details Not Save"));
//     }
      

// }
import '../connection/dbconfig.js'
import rs from 'randomstring' 
import path from 'path'
import url from 'url'
import APIResponse from '../response/APIResponse.js'
import serviceSchemaModel from '../model/services.js'
import bookingSchemaModel from '../model/BookingModel.js'
import catSchemaModel from '../model/category.js'   

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

//save service
export var saveService = async (req, res, next) => {
  try {
    var service_detail = req.body;
    var img_file = req.files.service_image;

    console.log("Received service detail:", service_detail);
    console.log("Category name received from frontend:", service_detail.category);

    
    if (!service_detail || !service_detail.category) {
      return res.status(400).json(new APIResponse(false, null, "Category name is required"));
    }

    const categoryName = service_detail.category.toLowerCase().trim();

  
    let catDoc = await catSchemaModel.findOne({ catName: categoryName });

    if (!catDoc) {
      const lastCat = await catSchemaModel.find().sort({ _id: -1 }).limit(1);
      const newCatId = lastCat.length === 0 ? 1 : lastCat[0]._id + 1;

      catDoc = await catSchemaModel.create({
        _id: newCatId,
        catName: categoryName
      });

      console.log(" New category created:", catDoc);
    }

    service_detail.category = catDoc._id;

   
    const service_list = await serviceSchemaModel.find();
    const len = service_list.length;
    const _id = (len == 0) ? 1 : service_list[len - 1]._id + 1;

  
    const image_name = Date.now() + "-" + rs.generate() + "-" + img_file.name;

    
    service_detail = {
      ...service_detail,
      _id: _id,
      service_image: image_name,
      info: Date()
    };

    
    const resp = await serviceSchemaModel.create(service_detail);

    
    const upload_path = path.join(__dirname, "../../frontend/public/upload/service", image_name);
    img_file.mv(upload_path);

    res.status(200).json(new APIResponse(true, resp, "Service details saved"));

  } catch (err) {
    console.log("Save service error:", err);
    res.status(500).json(new APIResponse(false, null, "Service details not saved"));
  }
};






 // FETCH 
export const fetchAllServices = async (req, res,next) => {
  try {
    const service = await serviceSchemaModel.find().populate("category");
   res.status(200).json(new APIResponse(true, service, "service Details Save"));

  } catch (err) {
    res.status(200).json({ message: "Failed to fetch services", error: err });
  }
};

// export const deleteServices = async (req, res, next) => {
//   const id = req.params.id;
//   console.log("id == " + id);

//   try {
//     const service = await serviceSchemaModel.findByIdAndDelete(id);
//     console.log("service == " + service);

//     if (!service) {
      
//       return res
//         .status(404)
//         .json(new APIResponse(false, null, "Service not found"));
//     }

//     res
//       .status(200)
//       .json(new APIResponse(true, service, "Deleted your data successfully"));
//   } catch (err) {
//     console.log("Error: " + err);
//     res
//       .status(500)
//       .json(new APIResponse(false, null, "Internal Server Error"));
//   }
// };




export const deleteServices = async (req, res, next) => {
  try {
    const id = Number(req.params.id); // Convert to Number, because your _id is Number type
    console.log("Deleting Service ID:", id);

    // Delete service
    const service = await serviceSchemaModel.findOneAndDelete({ _id: id });
    if (!service) {
      return res.status(404).json(new APIResponse(false, null, "Service not found"));
    }

    // Update bookings related to this service
    await bookingSchemaModel.updateMany(
      { serviceId: id },
      { $set: { status: "cancelled", info: "Service deleted by admin" } }
    );

    res.status(200).json(new APIResponse(true, service, "Deleted service and updated related bookings"));
  } catch (err) {
    console.error("Error deleting service:", err);
    res.status(500).json(new APIResponse(false, null, "Internal Server Error"));
  }
};









export const updateService = async (req, res, next) => {
  try {
    const id = req.params.id; // URL se ID
    let service_detail = req.body;
    const img_file = req.files?.service_image;

    console.log("🛠️ Updating Service ID:", id);
    console.log("📩 New data:", service_detail);

    // Category validation
    if (!service_detail || !service_detail.category) {
      return res
        .status(400)
        .json(new APIResponse(false, null, "Category name is required"));
    }

    const categoryName = service_detail.category.toLowerCase().trim();

    // Check if category exists
    let catDoc = await catSchemaModel.findOne({ catName: categoryName });

    // If not, create new
    if (!catDoc) {
      const lastCat = await catSchemaModel.find().sort({ _id: -1 }).limit(1);
      const newCatId = lastCat.length === 0 ? 1 : lastCat[0]._id + 1;

      catDoc = await catSchemaModel.create({
        _id: newCatId,
        catName: categoryName
      });

      console.log("🆕 New category created:", catDoc);
    }

    // Replace category name with _id
    service_detail.category = catDoc._id;

    // If new image is uploaded
    if (img_file) {
      const image_name = Date.now() + "-" + rs.generate() + "-" + img_file.name;

      const upload_path = path.join(
        __dirname,
        "../../frontend/public/upload/service",
        image_name
      );

      // Save image to upload folder
      img_file.mv(upload_path);

      service_detail.service_image = image_name;
    }

    // Update info field
    service_detail.info = Date();

    // Update service in DB
    const updatedService = await serviceSchemaModel.findByIdAndUpdate(
      id,
      service_detail,
      { new: true }
    );

    if (!updatedService) {
      return res
        .status(404)
        .json(new APIResponse(false, null, "Service not found"));
    }

    res
      .status(200)
      .json(new APIResponse(true, updatedService, "Service updated successfully"));
  } catch (err) {
    console.log("Update service error:", err);
    res
      .status(500)
      .json(new APIResponse(false, null, "Service update failed"));
  }
};

//fetching service with category
 export const fetchcategory = async(req,res,next)=>
 {
  const cat = req.params.name;
  console.log("cat="+cat)
  const service = await serviceSchemaModel.find().populate("category")
   console.log("service"+service)
  const filterservice = service.filter(service=>service.category.catName.toLowerCase()===cat.toLowerCase())
 console.log("filterserice"+filterservice)

  if(filterservice.length===0)
  {
    res.status(404)
        .json(new APIResponse(false, null, "category not found"));
  }
  else{
  res.status(200)
      .json(new APIResponse(true, filterservice, "Service updated successfully"));
  }
 }

  export const Nofetchcategory = async(req,res,next)=>
 {
  const cat  = decodeURIComponent(req.params.name).trim().toLowerCase();
  console.log("cat="+cat)
  const service = await serviceSchemaModel.find().populate("category")
   console.log("service"+service)
  const filterservice = service.filter(service=>service.category.catName.toLowerCase()===cat)

  console.log("filterserice"+filterservice)

  if(filterservice.length===0)
  {
    res.status(404)
        .json(new APIResponse(false, null, "cat not found"));
  }
  else{
  res.status(200)
      .json(new APIResponse(true, filterservice, "Service updated successfully"));
  }
 }