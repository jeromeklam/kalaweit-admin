export const defaultConfig = {
  layout: {
    savemenu: false,
    menuposition: true,
    listdetails: 'right',
  },
};

export const schema = {
  title: 'Configuration',
  description: 'Configuration',
  type: 'object',
  properties: {
    layout: {
      title: 'Affichage',
      description: "Options d'affichage",
      type: 'object',
      properties: {
        savemenu: {
          title: 'Sauver la position du menu',
          type: 'boolean',
          default: false,
        },
        menuposition: {
          title: 'Menu ouvert par défaut',
          type: 'boolean',
          default: true,
        },
        listdetails: {
          title: 'Affichage des détails',
          enum: ['right', 'inline'],
          default: 'right',
        },
      },
      required: ['savemenu', 'menuposition', 'listdetails'],
      default: { savemenu: true, menuposition: true, listdetails: 'right' },
    },
  },
  required: ['layout'],
};

export const getRealms = (user) => {
  let realms = [];
  if (user && user.realms && Array.isArray(user.realms)) {
    user.realms.forEach(item => {
      realms.push({value: item.id, label: item.grp_name});
    });
  }
  return realms;
}