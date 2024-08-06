const Listing=require("../models/listing");
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxgeocoding({ accessToken: mapToken });

module.exports.showListing=async (req, res) => {
    const { id } = req.params;
    console.log('Listing ID:', id); // Debugging output
    const showlisting = await Listing.findById(id)
        .populate({
            path: 'reviews',
            populate: { path: 'author' },
        })
        .populate('owner');
    if (!showlisting) {
        req.flash('error', "Listing doesn't exist");
        return res.redirect('/listings');
    }
    res.render('listings/show.ejs', { showlisting });
}
module.exports.index=async(req,res)=>{
    let allListing=await Listing.find();
    res.render("./listings/index.ejs",{allListing})
};

module.exports.renderNewForm=async(req,res)=>{
    res.render("./listings/new.ejs")
}



module.exports.createListing=async(req,res)=>{

   let response= await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
        .send()
     
    let url=req.file.path;
    let filename=req.file.filename;
    const newlisting=new Listing(req.body.listing);
    newlisting.owner=req.user;
    newlisting.image={url,filename};
    newlisting.geometry=response.body.features[0].geometry
    let savedlisting= await newlisting.save();
    console.log(savedlisting)
     req.flash("success","New Listing Created")
      res.redirect("/listings");
 //   { 
 //     let{title,description,image,price,country,location}=req.body.listing;
    
 //     let newlisting=new Listing({
 //         title:title,
 //         description:description,
 //         image:image,
 //         price:price,    
 //         country:country,
 //         location:location,
 //         owner:req.user._id,
 //     })
     
 };

 module.exports.renderEditForm=async(req,res)=>{
    let{id}=req.params;
    const showlisting=await Listing.findById(id);
    if(!showlisting){
        req.flash("error"," Listing doesn't exists");
        res.redirect("/listings")
    }
    let originalImageUrl=showlisting.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");
     res.render("./listings/edit.ejs",{showlisting,originalImageUrl})
};

module.exports.updateListing=async(req,res)=>{
   
    let{id}=req.params;
    const Updatedlisting=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if( typeof req.file !== "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    Updatedlisting.image={url,filename};
    await Updatedlisting.save();
    };
    console.log(Updatedlisting)
    req.flash("success","Listing Updated")
    res.redirect("/listings")
};

module.exports.destroyListing=async(req,res)=>{
   
    let{id}=req.params;
    let  deletedlisting=await Listing.findByIdAndDelete(id);
    console.log(deletedlisting)
    req.flash("success","Listing Deleted")
    res.redirect("/listings")
};