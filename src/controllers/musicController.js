const musicModel = require("../model/musicModel");
//.................... CREATE NEW MUSIC............................
const createMusic = async (req, res, next) => {
  try {
    console.log(req.body);
    const { title, artist, album, gener } = req.body;

    if (!title || !artist || !gener || !album) {
      res.json({
        message: "Please fill all the fields",
      });
    } else {
      const newPost = await musicModel.create({
        title,
        artist,
        album,
        gener,
      });

      if (!newPost) {
        res.json({
          message: "music not created",
        });
      } else {
        res.json({
          success: "music created successfully!",
          newPost,
        });
      }
    }
  } catch (error) {
    res.json({
      message: ("fill all fields", error.message),
    });
  }
};
//.................... GET ALL MUSIC............................

const getAllMusic = async (req, res, next) => {
  try {
    const response = await musicModel.find();
    res.json(response);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
//.................... GET SINGLE MUSIC............................

const getSingleMusic = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await musicModel.findById(id);
    res.json(response);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//.................... DELETE MUSIC MUSIC............................

const deleteMusic = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await musicModel.findByIdAndDelete(id);
    res.json(response);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
//.................... EDIT  MUSIC............................

const editMusic = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await musicModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(response);
  } catch (error) {
    res.json({
      message: error.message,
    });
    console.log(error.message);
  }
};
//................... MUSIC STATISTICS............................

const getNumber = async (req, res, next) => {
  try {
    const response = await musicModel.find();

    const counts = response.reduce((acc, item) => {
      acc.title[item.title] = (acc.title[item.title] || 0) + 1;
      acc.artist[item.artist] = (acc.artist[item.artist] || 0) + 1;
      acc.album[item.album] = (acc.album[item.album] || 0) + 1;
      acc.gener[item.gener] = (acc.gener[item.gener] || 0) + 1;

      if (!acc.albumsPerArtist[item.artist]) {
        acc.albumsPerArtist[item.artist] = {};
        acc.albumsPerArtist[item.artist][item.album] = 1;
      } else {
        if (!acc.albumsPerArtist[item.artist][item.album]) {
          acc.albumsPerArtist[item.artist][item.album] = 1;
        } else {
          acc.albumsPerArtist[item.artist][item.album] += 1;
        }
      }


      return acc;
    }, { title: {}, artist: {}, album: {}, gener: {}, albumsPerArtist: {} });
    const totalMusic = response.length;
    const totalArtists = Object.keys(counts.artist).length;
    const totalAlbums = Object.keys(counts.album).length;
    const totalGenres = Object.keys(counts.gener).length;
    res.json({
      totalMusic,
      totalArtists,
      totalAlbums,
      totalGenres,
      counts,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
//................... END OF API CONTROLLER............................

module.exports = {
  createMusic,
  getAllMusic,
  deleteMusic,
  getSingleMusic,
  editMusic,
  getNumber
};
