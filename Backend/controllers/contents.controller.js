const Contents = require('../models/contents.model');
const fs = require('fs');
const path = require('path');
exports.getAllContents = async (req, res) => {
  const contents = await Contents.getAll();


  res.json(contents);
};

  
exports.createContent = async (req, res) => {
    let targetPath = path.join(__dirname, '..', '..', '/Frontend/brandstory/public');
    targetPath=targetPath+'/'+req.body['src']
    const matches = req.body['Image'].match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
  
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 image string');
  }

  const ext = matches[1]; 
  const data = matches[2]; 
  const buffer = Buffer.from(data, 'base64');

  fs.writeFileSync(targetPath, buffer);
  const id = await Contents.create(req.body['Heading'],req.body['Content'],req.body['src']);
    res.status(201).json({ message: 'Content created' });

};
