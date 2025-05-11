const NavMenu = require('../models/navmenu.model');

exports.getAllMenus = async (req, res) => {
  const menus = await NavMenu.getAll();
  const parsedMenus = menus.map(menu => ({
    ...menu,
    submenu: parseSubMenu(menu.submenu)
  }));

  res.json(parsedMenus);
};

function parseSubMenu(submenu) {
    try {
      return JSON.parse(submenu);
    } catch {
      return []; 
    }
}
  
exports.createMenu = async (req, res) => {
    console.log(req.body)

  
  const { menu_name,color,subMenu ,link} = req.body; 
  var subMenuArr=[
  
  ]
 

  if(subMenu){
    var subMenuObj={}
    subMenuObj['menu']=subMenu ? subMenu : ""
    subMenuObj['link']=link ? subMenu : ""
    subMenuArr.push(subMenuObj)
  }
  
 
    console.log(menu_name,color,JSON.stringify(subMenuArr),"jjj")
    const id = await NavMenu.create(menu_name,color,JSON.stringify(subMenuArr));
    res.status(201).json({ message: 'Menu created' });
};
