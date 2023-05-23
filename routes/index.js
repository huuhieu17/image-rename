var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const images = fs.readdirSync(imagesDir).filter((file) => {
    const fileExt = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif'].includes(fileExt);
  });
  res.render('index', { images });
});

router.post("/", async function(req, res) {
  let oldName  = req.body.oldName;
  let newName  = req.body.newName;
  if(!oldName || !newName) return;
  const exportDir = path.join(process.cwd(), 'public', 'export');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, {
      recursive: true
    });
  }
  const dirFile = path.join(process.cwd(), "public", "images");

  const imageFile = path.join(dirFile, oldName);
  if (!fs.existsSync(imageFile)) {
    return;
  }
  const targetDir = path.join(exportDir, newName);
    // console.log({imageFile, targetDir});
  await fs.renameSync(imageFile, targetDir);
  res.redirect("/")
})

module.exports = router;
